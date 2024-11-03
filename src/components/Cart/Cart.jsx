import "./Cart.css";
import React, { useState, useContext } from "react";
import { ProductsCartContext } from "../../context/CartProducts";
import { ProductCartCard, ModalCart } from "../index";

export const Cart = () => {
  const { cartProducts, deleteProductToCart, handleCantProduct } =
    useContext(ProductsCartContext);
  const [finishWrite, setFinishWrite] = useState(false);
  const [direccion, setDireccion] = useState({
    address: "",
    postalCode: "",
    province: "",
    locality: "",
    personName: "",
    dni: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const finalPay = cartProducts.reduce(
    (accumulator, p) => accumulator + parseFloat(p.price) * p.cant,
    0
  );

  const classAdressContainer =
    direccion.address === null ||
    direccion.postalCode === null ||
    direccion.province === null ||
    direccion.locality === null ||
    direccion.personName === null ||
    direccion.dni === null
      ? "disabled"
      : "";

  const deleteAddresInfo = () => {
    setDireccion({
      address: "",
      postalCode: "",
      province: "",
      locality: "",
      personName: "",
      dni: "",
    });
    setFinishWrite(false);
  };

  return (
    <div className="carrito">
      <h2 className="carrito-title">Carrito de Compras</h2>
      {cartProducts.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <section className="product-cart-list">
          {cartProducts.map((product) => (
            <ProductCartCard
              key={product.id}
              product={product}
              deleteProductToCart={deleteProductToCart}
              handleCantProduct={handleCantProduct}
            />
          ))}

          <section className="send-container">
            <h2>Envio</h2>
            <section className="addres-info">
              {finishWrite ? (
                <button onClick={deleteAddresInfo} className="btn-add-address">
                  Eliminar Datos de Envio
                </button>
              ) : (
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="btn-add-address"
                >
                  Agregar Datos de Envio
                </button>
              )}

              <section className={`addres ${classAdressContainer}`}>
                <section className={`addres-info ${classAdressContainer}`}>
                  <article>
                    {direccion.address && finishWrite ? (
                      <p className="direccion-item">
                        <span className="direccion-label">Dirección:</span>
                        {direccion.address}
                      </p>
                    ) : (
                      ""
                    )}
                  </article>
                  <article>
                    {direccion.postalCode && finishWrite ? (
                      <p className="direccion-item">
                        <span className="direccion-label">Código Postal:</span>
                        {direccion.postalCode}
                      </p>
                    ) : (
                      ""
                    )}
                  </article>
                  <article>
                    {direccion.province && finishWrite ? (
                      <p className="direccion-item">
                        <span className="direccion-label">Provincia:</span>
                        {direccion.province}
                      </p>
                    ) : (
                      ""
                    )}
                  </article>
                  <article>
                    {direccion.locality && finishWrite ? (
                      <p className="direccion-item">
                        <span className="direccion-label">Localidad:</span>
                        {direccion.locality}
                      </p>
                    ) : (
                      ""
                    )}
                  </article>
                  <article>
                    {direccion.personName && finishWrite ? (
                      <p className="direccion-item">
                        <span className="direccion-label">
                          Nombre y Apellido:
                        </span>
                        {direccion.personName}
                      </p>
                    ) : (
                      ""
                    )}
                  </article>
                  <article>
                    {direccion.dni && finishWrite ? (
                      <p className="direccion-item">
                        <span className="direccion-label">DNI:</span>
                        {direccion.dni}
                      </p>
                    ) : (
                      ""
                    )}
                  </article>
                </section>
              </section>
            </section>
          </section>

          {modalIsOpen && (
            <ModalCart
              direccion={direccion}
              setDireccion={setDireccion}
              setModalIsOpen={setModalIsOpen}
              setFinishWrite={setFinishWrite}
              finishWrite={finishWrite}
            />
          )}

          <section className="pay-container">
            <h2 className="payment-title">Método de Pago</h2>
            <section className="payment-framework">
              <section className="pay-method">
                <section className="method">
                  <input
                    type="radio"
                    id="mercadoPago"
                    name="paymentMethod"
                    className="payment-input"
                  />
                  <label htmlFor="mercadoPago" className="payment-label">
                    Transferencia
                  </label>
                </section>
                <section className="method">
                  <input
                    type="radio"
                    id="transferencia"
                    name="paymentMethod"
                    className="payment-input"
                  />
                  <label htmlFor="transferencia" className="payment-label">
                    Tarjeta de Credito - Debito
                  </label>
                </section>
              </section>
              <section className="total-price">
                <h2>Total:</h2>
                <h2>${finalPay.toLocaleString()}</h2>
              </section>
            </section>
            <button className="btn-pay">Comprar</button>
          </section>
        </section>
      )}
    </div>
  );
};
