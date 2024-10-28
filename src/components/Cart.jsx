import React, { useState, useContext } from "react";
import { ProductsCartContext } from "../context/CartProducts";
import "./Cart.css";

export const Cart = () => {
  const [surcharge, setSurcharge] = useState(1);
  const { cartProducts, deleteProductToCart, handleCantProduct } =
    useContext(ProductsCartContext);

  const finalPay = cartProducts.reduce(
    (accumulator, p) => accumulator + parseFloat(p.price) * p.cant,
    0
  );

  return (
    <div className="carrito">
      <h2 className="carrito-title">Carrito de Compras</h2>
      {cartProducts.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <section className="product-cart-list">
          {cartProducts.map((product) => (
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
                >
                  -
                </button>
                <p>{product.cant}</p>
                <button
                  className="btn-cant"
                  onClick={() => handleCantProduct(product, "+")}
                >
                  +
                </button>
              </div>
              <button
                className="btn-delete"
                onClick={() => deleteProductToCart(product)}
              >
                Eliminar
              </button>
            </article>
          ))}
          <section className="pay-container">
            <h2 className="payment-title">Método de Pago</h2>
            <section className="payment-framework">
              <section className="pay-method">
                <section className="method">
                  <input
                    type="radio"
                    id="mercadoPago"
                    name="paymentMethod"
                    onClick={() => setSurcharge(1.4)}
                    className="payment-input"
                  />
                  <label htmlFor="mercadoPago" className="payment-label">
                    Mercado Pago
                  </label>
                </section>
                <section className="method">
                  <input
                    type="radio"
                    id="transferencia"
                    name="paymentMethod"
                    onClick={() => setSurcharge(1)}
                    className="payment-input"
                  />
                  <label htmlFor="transferencia" className="payment-label">
                    Transferencia
                  </label>
                </section>
              </section>
              <section className="total-price">
                <h2> Total:</h2>
                <h2>${(finalPay * surcharge).toFixed(2).toLocaleString()}</h2>
              </section>
            </section>
          </section>
        </section>
      )}
    </div>
  );
};
