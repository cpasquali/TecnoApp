import React from "react";

export const ProductCartCard = ({
  product,
  deleteProductToCart,
  handleCantProduct,
}) => {
  return (
    <article className="product-cart-card" key={product.id}>
      <span className="product-image">
        <img src={product.thumbnail} alt="foto de producto" />
      </span>
      <span className="product-info">
        <p className="product-card-title">{product.title}</p>
        <p className="product-price">
          ${(parseFloat(product.price) * product.cant).toLocaleString()}
        </p>
      </span>
      <div className="cant-product">
        <button
          className="btn-cant"
          onClick={() => handleCantProduct(product, "-")}
          disabled={product.cant === 1}
        >
          -
        </button>
        <p>{product.cant}</p>
        <button
          className="btn-cant"
          onClick={() => handleCantProduct(product, "+")}
          disabled={product.cant === 10}
        >
          +
        </button>
      </div>
      <button
        className="btn-delete"
        onClick={() => deleteProductToCart(product)}
      >
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </article>
  );
};
