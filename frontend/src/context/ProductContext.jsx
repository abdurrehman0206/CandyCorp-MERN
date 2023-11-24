import { createContext, useReducer, useLayoutEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };

    case "ADD_PRODUCT":
      return {
        products: [...state.products, action.payload],
      };

    case "CLEAR_PRODUCTS":
      return {
        products: null,
      };

    default:
      return state;
  }
};
export const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
  const initialState = {
    products: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    if (!user) {
      console.log("User is not logged in");
      return;
    }
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        if (response.ok && json.success) {
          dispatch({
            type: "SET_PRODUCTS",
            payload: json.data,
          });
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);
  return (
    <ProductContext.Provider value={{ ...state, loading, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
