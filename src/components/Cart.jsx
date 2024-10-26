import React, { useState, useEffect } from "react";
import "./Cart.css";

export const Cart = () => {
  const cartItemsLocalStorage = () => {
    const data = localStorage.getItem("carritoDeCompra");
    return data ? JSON.parse(data) : [];
  };

  const [cartItems, setCartItems] = useState(cartItemsLocalStorage());

  useEffect(() => {
    localStorage.setItem("carritoDeCompra", JSON.stringify(cartItems));
  }, [cartItems]);

  const DeleteProductToCart = (product) => {
    setCartItems(cartItems.filter((p) => p.title !== product.title));
  };

  let finalPay = cartItems.reduce(
    (accumulator, p) => accumulator + parseInt(p.price, 10),
    0
  );

  return (
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <section className="product-cart-list">
          {cartItems.map((product, index) => (
            <article className="product-cart-card" key={index}>
              <span>
                <img src={product.thumbnail} alt="foto de producto" />
                <p className="product-card-title">{product.title}</p>
              </span>
              <span>${parseInt(product.price).toLocaleString()}</span>
              <button
                className="btn-delete"
                onClick={() => DeleteProductToCart(product)}
              >
                Eliminar
              </button>
            </article>
          ))}
          <section className="pay-container">
            <section className="pay-method">
              <input type="radio" />
              <input type="radio" />
            </section>
            <h2>Price: ${finalPay.toLocaleString()}</h2>
          </section>
        </section>
      )}
    </div>
  );
};
