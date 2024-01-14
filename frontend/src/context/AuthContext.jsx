import { createContext, useReducer, useLayoutEffect } from "react";

export const AuthContext = createContext();
export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    case "ADD_TO_CART":
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, shoppingCart: action.payload })
      );
      return {
        user: {
          ...state.user,
          shoppingCart: action.payload,
        },
      };
    case "REMOVE_FROM_CART":
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, shoppingCart: action.payload })
      );
      return {
        user: {
          ...state.user,
          shoppingCart: action.payload,
        },
      };
      case "UPDATE_CART":
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, shoppingCart: action.payload })
      );
      return {
        user: {
          ...state.user,
          shoppingCart: action.payload,
        },
      };
    case "ADD_ADDRESS":
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...state.user,
          addresses: [...state.user.addresses, action.payload],
        })
      );
     
      return {
        user: {
          ...state.user,
          addresses: [...state.user.addresses, action.payload],
        },
      };
    case "UPDATE_ADDRESS":
      const newAddresses = state.user.addresses.map((address) => {
        if (address._id === action.payload._id) {
          return action.payload;
        } else return address;
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, addresses: newAddresses })
      );
      return {
        user: {
          ...state.user,
          addresses: newAddresses,
        },
      };
    case "DELETE_ADDRESS":
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, addresses: [...action.payload] })
      );
      return {
        user: {
          ...state.user,
          addresses: [...action.payload],
        },
      };

    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  useLayoutEffect(() => {
    const checkUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/verify`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        if (json.success) {
          localStorage.setItem("user", JSON.stringify(json.user));
          dispatch({ type: "LOGIN", payload: json.user });
        } else {
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT" });
        }
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
