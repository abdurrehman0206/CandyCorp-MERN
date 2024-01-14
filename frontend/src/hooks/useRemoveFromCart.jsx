import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
export const useRemoveFromCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, dispatch } = useAuthContext();
  const removeItemFromCart = async (itemId) => {
    if (!user) {
      console.log("User not logged in");
      return;
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/remove-from-cart/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (json.success) {
        if (json.data) {
          toast.success(json.message);
          dispatch({ type: "REMOVE_FROM_CART", payload: json.data });
        } else {
          console.log("Cart items data is undefined");
        }
      } else {
        toast.error(json.message);
        setError(json.error);
        console.log(json.error);
      }
    }
  };

  return { removeItemFromCart, loading, error };
};
