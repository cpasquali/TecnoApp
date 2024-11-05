import React, { useContext, useEffect, useState } from "react";
import { Card } from "../index";
import { SelectCategorContext } from "../../context/SelectCategoryProducts";
import "./ProductsContainer.css";

export const ProductsContainer = ({ searchValue, currentPage }) => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { category } = useContext(SelectCategorContext);

  const getData = async () => {
    let API_URL;
    if (category) {
      API_URL = `https://api.mercadolibre.com/sites/MLA/search?category=${category}&limit=24&offset=${currentPage}`;
    } else if (searchValue) {
      API_URL = `https://api.mercadolibre.com/sites/MLA/search?q=${searchValue}&limit=24&offset=${currentPage}`;
    } else {
      API_URL = `https://api.mercadolibre.com/sites/MLA/search?category=MLA1000&limit=24&offset=${currentPage}`;
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
    setIsloading(true);
    getData();
  }, [category, searchValue, currentPage]);

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
