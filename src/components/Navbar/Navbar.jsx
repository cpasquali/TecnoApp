import { useContext, useState } from "react";
import { Link } from "wouter";
import { SelectCategorContext } from "../../context/SelectCategoryProducts";
import "./Navbar.css";

export const Navbar = ({ setSearchValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState("");
  const { setCategory } = useContext(SelectCategorContext);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
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
      <img
        src="logo_transparent.png"
        alt="imagen del logo"
        className="img-logo"
      />
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
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link className="link" to="/home" onClick={handleHome}>
          INICIO
        </Link>
        <li>
          <a className="dropdown-activate" onClick={toggleDropdown}>
            CATEGORIAS{" "}
            <img
              src="/chevron.svg"
              className={`arrow ${isOpen ? "open" : ""}`}
              alt="Chevron"
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
        <Link className="link" to="/cart">
          CARRITO
        </Link>
      </ul>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
};
