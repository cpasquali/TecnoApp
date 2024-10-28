import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ProductsCartContext = createContext();

export const ProductsCartProvider = ({ children }) => {
  const productsInLocalStorage = () => {
    const data = localStorage.getItem("cartProducts");
    return data ? JSON.parse(data) : [];
  };

  const [cartProducts, setCartProducts] = useState(productsInLocalStorage);
  console.log(cartProducts);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addProductToCart = (product) => {
    setCartProducts((prevCart) => {
      const cleanCart = prevCart.filter((p) => p !== undefined);

      const repetido = cleanCart.find((p) => p.id === product.id);

      if (repetido) {
        return cleanCart.map((p) =>
          p.id === product.id ? { ...p, cant: p.cant + 1 } : p
        );
      } else {
        Swal.fire({
          icon: "success",
          title: "Producto añadido",
          text: `${product.title} se ha añadido a tu carrito.`,
          timer: 1500,
          showConfirmButton: false,
        });
        return [...cleanCart, { ...product, cant: 1 }];
      }
    });
  };

  const deleteProductToCart = (product) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar ${product.title} del carrito?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartProducts((prevCart) =>
          prevCart.filter((p) => p.id !== product.id)
        );
        Swal.fire(
          "Eliminado",
          `${product.title} ha sido eliminado.`,
          "success"
        );
      }
    });
  };

  const handleCantProduct = (product, operation) => {
    setCartProducts((prevCart) => {
      const productInCart = prevCart.find((p) => p.id === product.id);
      const newCant =
        operation === "+" ? productInCart.cant + 1 : productInCart.cant - 1;

      if (productInCart.cant > 0) {
        return prevCart.map((p) => {
          return p.id === product.id ? { ...p, cant: newCant } : p;
        });
      } else {
        return prevCart.filter((p) => p.id !== product.id);
      }
    });
  };

  return (
    <ProductsCartContext.Provider
      value={{
        cartProducts,
        addProductToCart,
        deleteProductToCart,
        handleCantProduct,
      }}
    >
      {children}
    </ProductsCartContext.Provider>
  );
};
