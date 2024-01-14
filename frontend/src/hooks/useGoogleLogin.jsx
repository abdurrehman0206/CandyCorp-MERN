import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
export const useGoogleLogin = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            googleId: user.uid,
            email: user.email,
            fullname: user.displayName,
            username: user.email.split("@")[0],
            image: user.photoURL,
          }),
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
        nav("/");
      } else {
        toast.error(error);
        setLoading(false);
        setError(json.error);
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setError(err.message);
    }
  };

  return { handleGoogleLogin, loading, error };
};
