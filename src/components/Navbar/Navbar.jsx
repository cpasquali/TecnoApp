import { useState } from "react";
import { Link } from "wouter";
import "./Navbar.css";

export const Navbar = ({ setCategory, setSearchValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = () => {
    setSearchValue(value);
    setValue("");
  };

  const handleHome = () => {
    setSearchValue("");
    setCategory(null);
  };

  return (
    <nav>
      <h2>TECNOAPP</h2>
      <div className="search-container">
        <input
          type="search"
          className="search-bar"
          placeholder="¿Qué estás buscando?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn-search" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      <ul>
        <Link className="link" to="/" onClick={handleHome}>
          INICIO
        </Link>
        <li>
          <a className="dropdown-activate" onClick={toggleDropdown}>
            CATEGORIAS{" "}
            <img
              src="public/chevron-abajo.png"
              className={`arrow ${isOpen ? "open" : ""}`}
            />
          </a>
          {isOpen && (
            <div className="dropdown">
              <a
                onClick={() => {
                  setCategory("MLA1002");
                  setIsOpen(false);
                }}
              >
                Televisores
              </a>
              <a
                onClick={() => {
                  setCategory("MLA1051");
                  setIsOpen(false);
                }}
              >
                Teléfonos
              </a>
              <a
                onClick={() => {
                  setCategory("MLA1039");
                  setIsOpen(false);
                }}
              >
                Audio y Video
              </a>
              <a
                onClick={() => {
                  setCategory("MLA1692");
                  setIsOpen(false);
                }}
              >
                Componentes de PC
              </a>
            </div>
          )}
        </li>
        <Link to="/cart">CARRITO</Link>
      </ul>
    </nav>
  );
};
