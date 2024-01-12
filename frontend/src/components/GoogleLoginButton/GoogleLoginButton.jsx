import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";

const GoogleLoginButton = () => {
  const { googleLogin, loading } = useGoogleLogin();

  const responseGoogle = (response) => {
    console.log("🚀 ~ responseGoogle ~ response:", response);

    if (response && response.tokenId) {
      googleLogin(response.tokenId);
    } else {
      console.error("Google login error:", response.error);
    }
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
      buttonText={loading ? "Logging In" : "Sign in with Google"}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
      uxMode="redirect"
      redirectUri="http://localhost:3000/login/"
    />
  );
};

export default GoogleLoginButton;
