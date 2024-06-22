import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signOut } from "../redux/authSlice.js";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  React.useEffect(() => {
    // console.log("Auth status: ", isAuthenticated);
    // console.log("Error: ", error);
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, error]);
  const handleSignIn = (event) => {
    event.preventDefault();
    const email = event.target.username.value;
    const password = event.target.password.value;
    dispatch(login({ email, password }));
  };

  return (
    <>
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="submit"
            className="sign-in-button"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading..." : "Sign In"}
          </button>
        </form>
      </section>
    </>
  );
}

export default SignIn;
