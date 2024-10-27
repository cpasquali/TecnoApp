import React, { useState } from "react";
import { ProductsContainer } from "./ProductsContainer/ProductsContainer";
import { Navbar } from "./Navbar/Navbar";
import { Route, Switch } from "wouter";
import { Footer } from "./Footer/Footer";
import { Cart } from "./Cart";
import { ProductsCartProvider } from "../context/CartProducts";
import { SelectCategoryProvider } from "../context/SelectCategoryProducts";

export const Layout = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <ProductsCartProvider>
        <SelectCategoryProvider>
          <Navbar setSearchValue={setSearchValue} />
          <div className="main-container">
            <Switch>
              <Route
                path="/"
                component={() => (
                  <ProductsContainer searchValue={searchValue} />
                )}
              />
              <Route path="/cart" component={Cart} />
            </Switch>
          </div>
          <Footer />
        </SelectCategoryProvider>
      </ProductsCartProvider>
    </>
  );
};
