import { useState } from "react";
import { Route, Switch } from "wouter";
import { ProductsCartProvider } from "../context/CartProducts";
import { SelectCategoryProvider } from "../context/SelectCategoryProducts";
import { Footer, Cart, ProductsContainer, Navbar, LandingPage } from "./index";

export const Layout = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="layout">
      <ProductsCartProvider>
        <SelectCategoryProvider>
          {window.location.pathname !== "/" && (
            <Navbar setSearchValue={setSearchValue} />
          )}

          <div className="main-container">
            <Switch>
              <Route
                path="/home"
                component={() => (
                  <ProductsContainer searchValue={searchValue} />
                )}
              />
              <Route path="/cart" component={Cart} />
              <Route path="/" component={LandingPage} />
            </Switch>
          </div>
          {window.location.pathname !== "/" && <Footer />}
        </SelectCategoryProvider>
      </ProductsCartProvider>
    </div>
  );
};
