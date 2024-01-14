import { useContext } from "react";
import { filterContext } from "../context/filterContext";
export const useFilter = () => {
  const { context } = useContext(filterContext);
  console.log(context);
  if (!context) {
    throw new Error("useFilter must be used within useFilterProvider");
  } else {
    return context;
  }
};
