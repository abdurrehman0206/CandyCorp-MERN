// useGoogleAuth.js

import { useState } from "react";

const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async (googleData) => {
    console.log("🚀 ~ handleGoogleLogin ~ googleData:", googleData)
    setError(null);
    setLoading(true);
    console.log("HandleGoogleLogin");
    try {
      // Send the Google data to your backend for authentication
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/auth/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          
        }
      );

      const json = await response.json();
      console.log("🚀 ~ handleGoogleLogin ~ json:", json)

      if (json.success) {
        // Handle successful login
        setLoading(false);
        setError(null);
        // Dispatch user data or perform any other necessary actions
      } else {
        // Handle login failure
        setLoading(false);
        setError(json.error);
      }
    } catch (err) {
      console.log("🚀 ~ handleGoogleLogin ~ err:", err)
      // Handle network errors or unexpected issues
      setLoading(false);
      setError(err.message);
    }
  };

  return { handleGoogleLogin, loading, error };
};

export default useGoogleAuth;
