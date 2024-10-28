import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Sobre Nosotros</h4>
          <p>
            TecnoApp es tu tienda de tecnología en Villa Ramallo. Ofrecemos una
            amplia gama de productos electrónicos y gadgets.
          </p>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: info@tecnoapp.com</p>
          <p>Teléfono: (03400) 123-456</p>
        </div>
        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <p>Síguenos en nuestras redes sociales:</p>
          <p>
            <a>Facebook</a> | <a>Instagram</a> | <a>Twitter</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
