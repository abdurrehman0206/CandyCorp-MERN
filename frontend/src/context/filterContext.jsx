import React, { createContext, useReducer } from "react";

export const filterContext = createContext();

const initialValue = {
  size: [],
  type: [],
  flavor: [],
  category: [],
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "Size":
      return {
        ...state,
        size: [...state.size, action.payload],
      };
    case "Type":
      return {
        ...state,
        type: [...state.type, action.payload],
      };
    case "Flavor":
      return {
        ...state,
        flavor: [...state.flavor, action.payload],
      };
    case "Category":
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case "Del_Size":
      return {
        ...state,
        size: state.size.filter((item) => item !== action.payload),
      };
    case "Del_Type":
      return {
        ...state,
        type: state.type.filter((item) => item !== action.payload),
      };
    case "Del_Flavor":
      return {
        ...state,
        flavor: state.flavor.filter((item) => item !== action.payload),
      };
    case "Del_Category":
      return {
        ...state,
        category: state.category.filter((item) => item !== action.payload),
      };
    case "reset":
      return initialValue;
    default:
      return state;
  }
};

export const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialValue);
  const resetValue = () => {
    dispatch({ type: "reset" });
  };
  return (
    <filterContext.Provider value={{ state, dispatch, resetValue }}>
      {children}
    </filterContext.Provider>
  );
};
