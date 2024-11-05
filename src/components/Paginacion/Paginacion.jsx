import React, { useState, useEffect } from "react";
import "./Paginacion.css";

export const Paginacion = ({ currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const generarPaginacion = () => {
      let pageNumbers = [];
      if (currentPage <= 1) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 2; i++) {
          if (i > 0) pageNumbers.push(i);
        }
      }
      setPages(pageNumbers);
    };

    generarPaginacion();
  }, [currentPage]);

  return (
    <div className="paginacion">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`paginacion-item ${
            currentPage === page ? "active-button" : ""
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
