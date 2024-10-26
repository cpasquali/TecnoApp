import React, { useState } from "react";
import { ProductsContainer } from "./ProductsContainer/ProductsContainer";
import { Navbar } from "./Navbar/Navbar";
import { Route, Switch, useLocation } from "wouter";
import { ProductDetails } from "./ProductDetails/ProductDetails";
import { Footer } from "./Footer/Footer";
import { Cart } from "./Cart";

export const Layout = () => {
  const [category, setCategory] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Navbar setCategory={setCategory} setSearchValue={setSearchValue} />
      <div className="main-container">
        <Switch>
          <Route
            path="/"
            component={() => (
              <ProductsContainer
                category={category}
                searchValue={searchValue}
              />
            )}
          />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};
