import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice.js";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);
  const [localError, setLocalError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, error]);

  const validateInputs = (email, password) => {
    if (!email || !password) {
      return "Username and password are required.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return null;
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (isButtonDisabled) return;

    const email = event.target.username.value;
    const password = event.target.password.value;
    const validationError = validateInputs(email, password);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    setIsButtonDisabled(true);
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      setLocalError(
        error.message ||
          "Authentication failed. Please check your credentials and try again."
      );
    } finally {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 5000); // Désactive le bouton pendant 5 secondes
    }
  };

  return (
    <>
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {localError && <p style={{ color: "red" }}>{localError}</p>}
        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="submit"
            className="sign-in-button"
            disabled={isButtonDisabled || status === "loading"}
          >
            {status === "loading" ? "Loading..." : "Sign In"}
          </button>
        </form>
      </section>
    </>
  );
}

export default SignIn;
