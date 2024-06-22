import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/authSlice.js";
import logo from "../assets/img/argentBankLogo.png";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };
  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          src={logo}
          alt="Argent Bank Logo"
          className="main-nav-logo-image"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {!isAuthenticated ? (
          <NavLink to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          <button onClick={handleSignOut} className="main-nav-item">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
