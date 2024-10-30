import React, { useState, useContext } from "react";
import { ProductsCartContext } from "../context/CartProducts";
import "./Cart.css";

export const Cart = () => {
  const [surcharge, setSurcharge] = useState(1);
  const { cartProducts, deleteProductToCart, handleCantProduct } =
    useContext(ProductsCartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finishWrite, setFinishWrite] = useState(false);
  const [direccion, setDireccion] = useState({
    address: "",
    postalCode: "",
    province: "",
    locality: "",
    personName: "",
    personLastName: "",
    dni: "",
  });

  const finalPay = cartProducts.reduce(
    (accumulator, p) => accumulator + parseFloat(p.price) * p.cant,
    0
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDireccion((prevDireccion) => ({
      ...prevDireccion,
      [name]: value,
    }));
  };

  const saveAddress = () => {
    closeModal();
    setFinishWrite(!finishWrite);
  };

  const classAdressContainer =
    direccion.address === null ||
    direccion.postalCode === null ||
    direccion.province === null ||
    direccion.locality === null ||
    direccion.personName === null ||
    direccion.personLastName === null ||
    direccion.dni === null
      ? "disabled"
      : "";

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
                  disabled={product.cant === 1}
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
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </article>
          ))}

          <section className="send-container">
            <h2>Envio</h2>
            <section className="addres-info">
              <button onClick={openModal} className="btn-add-address">
                Agregar Dirección de Envío
              </button>
              <section className={`addres ${classAdressContainer}`}>
                <section className={`addres-info ${classAdressContainer}`}>
                  <h3>
                    {direccion.address && finishWrite ? (
                      <span className="direccion-item">
                        Dirección: {direccion.address}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>
                  <h3>
                    {direccion.postalCode && finishWrite ? (
                      <span className="direccion-item">
                        Código Postal: {direccion.postalCode}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>
                  <h3>
                    {direccion.province && finishWrite ? (
                      <span className="direccion-item">
                        Provincia: {direccion.province}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>
                  <h3>
                    {direccion.locality && finishWrite ? (
                      <span className="direccion-item">
                        Localidad: {direccion.locality}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>
                  <h3>
                    {direccion.personName && finishWrite ? (
                      <span className="direccion-item">
                        Nombre: {direccion.personName}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>
                  <h3>
                    {direccion.personLastName && finishWrite ? (
                      <span className="direccion-item">
                        Apellido: {direccion.personLastName}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>
                  <h3>
                    {direccion.dni && finishWrite ? (
                      <span className="direccion-item">
                        DNI: {direccion.dni}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>
                </section>
              </section>
            </section>
          </section>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h3>Dirección de Envío</h3>
                <input
                  type="text"
                  name="address"
                  value={direccion.address}
                  onChange={handleChange}
                  placeholder="Direccion de Entrega"
                  className="address-input"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={direccion.postalCode}
                  onChange={handleChange}
                  placeholder="Codigo Postal"
                  className="address-input"
                />
                <input
                  type="text"
                  name="province"
                  value={direccion.province}
                  onChange={handleChange}
                  placeholder="Provincia"
                  className="address-input"
                />
                <input
                  type="text"
                  name="locality"
                  value={direccion.locality}
                  onChange={handleChange}
                  placeholder="Localidad"
                  className="address-input"
                />
                <h4>Datos de la persona autorizada a recibir el envío.</h4>
                <input
                  type="text"
                  name="personName"
                  value={direccion.personName}
                  onChange={handleChange}
                  placeholder="Nombre de la Persona Autorizada"
                  className="address-input"
                />
                <input
                  type="text"
                  name="personLastName"
                  value={direccion.personLastName}
                  onChange={handleChange}
                  placeholder="Apellido de la Persona Autorizada"
                  className="address-input"
                />
                <input
                  type="text"
                  name="dni"
                  value={direccion.dni}
                  onChange={handleChange}
                  placeholder="DNI de la Persona Autorizada"
                  className="address-input"
                />
                <div className="modal-buttons">
                  <button onClick={closeModal} className="btn-cancel">
                    Cancelar
                  </button>
                  <button onClick={saveAddress} className="btn-save">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
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
                <h2>Total:</h2>
                <h2>${(finalPay * surcharge).toLocaleString()}</h2>
              </section>
            </section>
            <button className="btn-pay">Comprar</button>
          </section>
        </section>
      )}
    </div>
  );
};
