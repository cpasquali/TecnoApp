import React, { useState, useEffect } from "react";
import "./Cart.css";

export const Cart = () => {
  const getCartItemsFromLocalStorage = () => {
    const data = localStorage.getItem("carritoDeCompra");
    return data ? JSON.parse(data) : [];
  };

  const [cartItems, setCartItems] = useState(getCartItemsFromLocalStorage());
  const [surcharge, setSurcharge] = useState(1);

  useEffect(() => {
    localStorage.setItem("carritoDeCompra", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteProductFromCart = (product) => {
    setCartItems(cartItems.filter((p) => p.id !== product.id));
  };

  const finalPay = cartItems.reduce(
    (accumulator, p) => accumulator + parseFloat(p.price),
    0
  );

  return (
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <section className="product-cart-list">
          {cartItems.map((product) => (
            <article className="product-cart-card" key={product.id}>
              <span>
                <img src={product.thumbnail} alt="foto de producto" />
                <p className="product-card-title">{product.title}</p>
              </span>
              <span>${parseFloat(product.price).toLocaleString()}</span>
              <button
                className="btn-delete"
                onClick={() => deleteProductFromCart(product)}
                aria-label={`Eliminar ${product.title} del carrito`}
              >
                Eliminar
              </button>
            </article>
          ))}
          <section className="pay-container">
            <section className="pay-method">
              <section className="method">
                <label htmlFor="mercadoPago">Mercado Pago</label>
                <input
                  type="radio"
                  id="mercadoPago"
                  name="paymentMethod"
                  onClick={() => setSurcharge(1.4)}
                />
              </section>
              <section className="method">
                <label htmlFor="transferencia">Transferencia</label>
                <input
                  type="radio"
                  id="transferencia"
                  name="paymentMethod"
                  onClick={() => setSurcharge(1)}
                />
              </section>
            </section>
            <h2>Total: ${finalPay.toFixed(2) * surcharge}</h2>
          </section>
        </section>
      )}
    </div>
  );
};
