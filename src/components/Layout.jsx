import { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { ProductsCartProvider } from "../context/CartProducts";
import { SelectCategoryProvider } from "../context/SelectCategoryProducts";
import { Footer, Cart, ProductsContainer, Navbar, LandingPage } from "./index";

export const Layout = () => {
  const [searchValue, setSearchValue] = useState("");
  const [location] = useLocation();
  const isRoot = location === "/";

  return (
    <div className="layout">
      <ProductsCartProvider>
        <SelectCategoryProvider>
          {!isRoot && <Navbar setSearchValue={setSearchValue} />}
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
          {!isRoot && <Footer />}
        </SelectCategoryProvider>
      </ProductsCartProvider>
    </div>
  );
};
