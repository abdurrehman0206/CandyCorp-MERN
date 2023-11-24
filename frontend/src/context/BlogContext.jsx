import { createContext, useReducer, useLayoutEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return {
        blogs: action.payload,
      };

    case "ADD_BLOGS":
      return {
        blogs: [...state.blogs, action.payload],
      };

    case "CLEAR_BLOGS":
      return {
        blogs: null,
      };

    default:
      return state;
  }
};
export const BlogContext = createContext();
export const BlogContextProvider = ({ children }) => {
  const initialState = {
    blogs: null,
  };

  const [state, dispatch] = useReducer(blogReducer, initialState);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    if (!user) {
      console.log("User is not logged in");
      return;
    }
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/blogs`,
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
            type: "SET_BLOGS",
            payload: json.data,
          });
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [user]);
  return (
    <BlogContext.Provider value={{ ...state, loading, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
