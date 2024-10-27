import React, { createContext, useEffect, useState } from "react";

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
    setCartProducts((prevCart) => [...prevCart, product]);
  };

  const deleteProductToCart = (product) => {
    setCartProducts((prevCart) => prevCart.filter((p) => p.id !== product.id));
  };

  return (
    <ProductsCartContext.Provider
      value={{ cartProducts, addProductToCart, deleteProductToCart }}
    >
      {children}
    </ProductsCartContext.Provider>
  );
};
