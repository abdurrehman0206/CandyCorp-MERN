import { useContext } from "react";
import { BundleContext } from "../context/BundleContext";

export const useBundleContext = () => {
  const context = useContext(BundleContext);

  if (!context) {
    throw new Error(
      "useBundleContext must be used within BundleContextProvider"
    );
  } else {
    return context;
  }
};
