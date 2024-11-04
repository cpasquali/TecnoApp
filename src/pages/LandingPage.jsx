import { Link } from "wouter";
import "./LandingPage.css";

export const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-header">
        <div className="landing-header-text">
          <h1 className="fade-in">Bienvenido a TecnoApp</h1>
          <p className="fade-in">
            Clickea y busca el mejor producto para tus necesidades
          </p>
          <Link className="btn-landing fade-in" to="/home">
            Comenzar
          </Link>
        </div>
        <img
          src="logo_transparent.png"
          alt="imagen del logo"
          className="landing-header-image fade-in"
        />
      </div>
    </div>
  );
};
