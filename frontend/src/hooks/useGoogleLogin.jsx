// useGoogleLogin.js
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

export const useGoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const googleLogin = async (tokenId) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/auth/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId }),
        }
      );

      const json = await response.json();

      if (json.success) {
        toast.success(json.message);
        setLoading(false);
        setError(null);
        dispatch({
          type: "LOGIN",
          payload: json.user,
        });
        localStorage.setItem("user", JSON.stringify(json.user));
      } else {
        toast.error(json.error);
        setLoading(false);
        setError(json.error);
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setError(err.message);
    }
  };

  return { googleLogin, loading, error };
};
