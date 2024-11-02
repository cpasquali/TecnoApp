import React, { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success(`${product.title} se ha añadido a tu carrito.`, {
          autoClose: 1000,
        });
        return [...cleanCart, { ...product, cant: 1 }];
      }
    });
  };

  const deleteProductToCart = (product) => {
    setCartProducts((prevCart) => prevCart.filter((p) => p.id !== product.id));
    toast.error(`${product.title} ha sido eliminado.`, {
      autoClose: 1000,
      position: "top-left",
    });
  };

  const handleCantProduct = (product, operation) => {
    setCartProducts((prevCart) => {
      const productInCart = prevCart.find((p) => p.id === product.id);
      const newCant =
        operation === "+" ? productInCart.cant + 1 : productInCart.cant - 1;

      return prevCart.map((p) => {
        return p.id === product.id ? { ...p, cant: newCant } : p;
      });
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
      <ToastContainer />
    </ProductsCartContext.Provider>
  );
};
