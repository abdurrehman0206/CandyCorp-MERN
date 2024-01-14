import { createContext, useReducer, useLayoutEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const bundleReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUNDLES":
      return {
        bundles: action.payload,
      };

    case "ADD_BUNDLE":
      return {
        bundles: [...state.bundles, action.payload],
      };

    case "CLEAR_BUNDLES":
      return {
        bundles: null,
      };
    case "UPDATE_BUNDLE_LIKES":
      return {
        bundles: state.bundles.map((bundle) =>
          bundle._id === action.payload.bundleId
            ? { ...bundle, likes: action.payload.likes }
            : bundle
        ),
      };
    default:
      return state;
  }
};

export const BundleContext = createContext();

export const BundleContextProvider = ({ children }) => {
  const initialState = {
    bundles: null,
  };

  const [state, dispatch] = useReducer(bundleReducer, initialState);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (!user) {
      console.log("User is not logged in");
      return;
    }

    const fetchBundles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/bundles`,
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
            type: "SET_BUNDLES",
            payload: json.data,
          });
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, [user]);

  return (
    <BundleContext.Provider value={{ ...state, loading, dispatch }}>
      {children}
    </BundleContext.Provider>
  );
};
