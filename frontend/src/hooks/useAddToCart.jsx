import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, dispatch } = useAuthContext();
  const addProductToCart = async (itemId, quantity = 1) => {
    if (!user) {
      console.log("User not logged in");
      return;
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ itemId, quantity }),
        }
      );
      const json = await response.json();
      if (json.success) {
        toast.success(json.message);
        dispatch({ type: "ADD_TO_CART", payload: json.data });
      } else {
        toast.error(json.message);
        setError(json.error);
        console.log(json.error);
      }
    }
  };
  return { addProductToCart, loading, error };
};
