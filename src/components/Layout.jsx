import { useState } from "react";
import { Route, Switch } from "wouter";
import { ProductsCartProvider } from "../context/CartProducts";
import { SelectCategoryProvider } from "../context/SelectCategoryProducts";
import { Footer, Cart, ProductsContainer, Navbar } from "./index";

export const Layout = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="layout">
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
    </div>
  );
};
