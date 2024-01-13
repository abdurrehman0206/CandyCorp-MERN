import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
function Login() {
  document.title = "Login";
  const {
    handleGoogleLogin,
    loading: googleLoading,
    error: googleError,
  } = useGoogleLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="auth-wrapper">
      <form
        className="auth-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="auth-form-header">
          <h1>Login</h1>
          <p>Sweet Account Access</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="johndoe@candycorp.dev"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </div>
        <button className="btn-box-primary" disabled={true}>
          {loading ? "Logging In" : "Login"}
        </button>

        <button
          className="btn-box-primary"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
        >
          {googleLoading ? "Logging In with Google" : "Login with Google"}
        </button>
        {googleError && <p className="error-message">{googleError}</p>}

        <small>
          Don't have an account? <NavLink to="/signup">Register</NavLink>
        </small>
      </form>
    </div>
  );
}

export default Login;
