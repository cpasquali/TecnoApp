import React from "react";
import "./ModalCart.css";

export const ModalCart = ({
  direccion,
  setDireccion,
  setModalIsOpen,
  setFinishWrite,
  finishWrite,
}) => {
  const closeModal = () => setModalIsOpen(false);

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

  return (
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
  );
};
