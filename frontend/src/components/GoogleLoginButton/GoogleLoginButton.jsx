import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID 


  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      uxMode="redirect"
      redirectUri="http://localhost:3000"
     
    />
  );
};

export default GoogleLoginButton;
