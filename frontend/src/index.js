import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ProductContextProvider } from "./context/ProductContext";
import { BlogContextProvider } from "./context/BlogContext";
import { BundleContextProvider } from "./context/BundleContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <BundleContextProvider>
          <BlogContextProvider>
            <App />
          </BlogContextProvider>
        </BundleContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
