import { Link } from "wouter";
import "../App.css";

export const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="fade-in">Bienvenido a Nuestra Aplicación</h1>
      <p className="fade-in">
        Aquí puedes encontrar información sobre nuestro servicio.
      </p>
      <Link className="btn-landing fade-in" to="/home">
        Comenzar
      </Link>
    </div>
  );
};
