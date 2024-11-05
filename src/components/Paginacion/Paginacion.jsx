import React, { useState, useEffect } from "react";
import "./Paginacion.css";

export const Paginacion = ({
  currentPage,
  setCurrentPage,
  pageValue,
  setPageValue,
}) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const generarPaginacion = () => {
      let pageNumbers = [];
      if (pageValue <= 1) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = pageValue - 1; i <= pageValue + 2; i++) {
          if (i > 0) pageNumbers.push(i);
        }
      }
      setPages(pageNumbers);
    };

    generarPaginacion();
  }, [pageValue]);

  const handlePageChange = (page) => {
    setPageValue(page);
    setCurrentPage(page * 25);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="paginacion">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`paginacion-item ${
            pageValue === page ? "active-button" : ""
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
