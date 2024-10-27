import React, { useEffect, useState } from "react";
import "./ProductDetails.css";

export const ProductDetails = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState({});

  const getData = async () => {
    try {
      const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("error en la ejecucion", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const imagen = product.thumbnail
    ? product.thumbnail.replace("-I.jpg", "-XXX.jpg")
    : "";

  return <article className="product-details"></article>;
};
