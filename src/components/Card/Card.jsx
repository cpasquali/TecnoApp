import { Link } from "wouter";
import "./Card.css";
import { useState, useEffect } from "react";

export const Card = ({ product }) => {
  const cartItemsLocalStorage = () => {
    const data = localStorage.getItem("carritoDeCompra");
    return data ? JSON.parse(data) : [];
  };

  const [cartItems, setCartItems] = useState(cartItemsLocalStorage());

  useEffect(() => {
    localStorage.setItem("carritoDeCompra", JSON.stringify(cartItems));
  }, [cartItems]);

  const addProductToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  const imagen = product.thumbnail.replace("-I.jpg", "-X.jpg");

  return (
    <article className="product">
      <img className="image" src={imagen} alt={`Imagen de ${product.title}`} />
      <h4 className="title">{product.title}</h4>
      <div className="product-price">
        <p>${parseFloat(product.price).toLocaleString()}</p>
        <button
          className={`product-button ${
            cartItems.some((p) => p.title === product.title) ? "in-cart" : ""
          }`}
          onClick={() => addProductToCart(product)}
        >
          <ion-icon name="cart-outline"></ion-icon>
        </button>
      </div>
      <Link className={"btn-view"} to={`/product/${product.id}`}>
        Ver Producto
      </Link>
    </article>
  );
};
