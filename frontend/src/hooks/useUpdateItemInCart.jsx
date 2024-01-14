import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
export const useUpdateItemInCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, dispatch } = useAuthContext();
  const updateItemInCart = async (itemId, quantity) => {
    if (!user) {
      console.log("User not logged in");
      return;
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/update-cart-item/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ itemId, quantity }),
        }
      );
      const json = await response.json();
      if (json.success) {
        if (json.data) {
          toast.success(json.message);
          dispatch({ type: "UPDATE_CART", payload: json.data });
        } else {
          console.log("Cart items data is undefined");
        }
      } else {
        setError(json.error);
        toast.error(json.message);
        console.log(json.error);
      }
    }
  };

  return { updateItemInCart, loading, error };
};
