import { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { ProductsCartProvider } from "../context/CartProducts";
import { SelectCategoryProvider } from "../context/SelectCategoryProducts";
import {
  Footer,
  Cart,
  ProductsContainer,
  Navbar,
  LandingPage,
  Paginacion,
} from "./index";

export const Layout = () => {
  const [searchValue, setSearchValue] = useState("");
  const [location] = useLocation();
  const isRootLanding = location === "/";
  const isRootCart = location === "/cart";
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="layout">
      <ProductsCartProvider>
        <SelectCategoryProvider>
          {!isRootLanding && (
            <Navbar
              setSearchValue={setSearchValue}
              setCurrentPage={setCurrentPage}
            />
          )}
          <div className="main-container">
            <Switch>
              <Route
                path="/home"
                component={() => (
                  <ProductsContainer
                    searchValue={searchValue}
                    currentPage={currentPage}
                  />
                )}
              />
              <Route path="/cart" component={Cart} />
              <Route path="/" component={LandingPage} />
            </Switch>
            {!isRootLanding && !isRootCart && (
              <Paginacion
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
          {!isRootLanding && <Footer />}
        </SelectCategoryProvider>
      </ProductsCartProvider>
    </div>
  );
};
