import { useContext } from "react";
import { ProductContext } from "../context/NFTContext";
export const useNFTContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useNftContext must be used within NftContextProvider");
  } else {
    return context;
  }
};
