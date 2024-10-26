import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import "./ProductsContainer.css";

export const ProductsContainer = ({ category, searchValue }) => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const getData = async () => {
    let API_URL;
    if (category) {
      API_URL = `https://api.mercadolibre.com/sites/MLA/search?category=${category}`;
    } else if (searchValue) {
      API_URL = `https://api.mercadolibre.com/sites/MLA/search?q=${searchValue}`;
    } else {
      API_URL =
        "https://api.mercadolibre.com/sites/MLA/search?category=MLA1000";
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(response.status, response.statusText);
      }
      const data = await response.json();
      setProductList(data.results);
    } catch (error) {
      console.error("Error en la ejecución", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    console.log("Category:", category);
    console.log("Search Value:", searchValue);
    setIsloading(true);
    getData();
  }, [category, searchValue]);

  if (isLoading) {
    return (
      <div className="container-loader">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="product-container">
      {productList.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </section>
  );
};
