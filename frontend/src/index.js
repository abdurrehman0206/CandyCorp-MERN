import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ProductContextProvider } from "./context/ProductContext";
import { BlogContextProvider } from "./context/BlogContext";
import { BundleContextProvider } from "./context/BundleContext";
import { FilterContextProvider } from "./context/filterContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <BlogContextProvider>
          <BundleContextProvider>
            <FilterContextProvider>
              <App />
            </FilterContextProvider>
          </BundleContextProvider>
        </BlogContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
