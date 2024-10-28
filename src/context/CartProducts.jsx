import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ProductsCartContext = createContext();

export const ProductsCartProvider = ({ children }) => {
  const productsInLocalStorage = () => {
    const data = localStorage.getItem("cartProducts");
    return data ? JSON.parse(data) : [];
  };

  const [cartProducts, setCartProducts] = useState(productsInLocalStorage);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addProductToCart = (product) => {
    Swal.fire({
      icon: "success",
      title: "Producto añadido",
      text: `${product.title} se ha añadido a tu carrito.`,
      timer: 1500,
      showConfirmButton: false,
    });
    setCartProducts((prevCart) => [...prevCart, product]);
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

  return (
    <ProductsCartContext.Provider
      value={{ cartProducts, addProductToCart, deleteProductToCart }}
    >
      {children}
    </ProductsCartContext.Provider>
  );
};
