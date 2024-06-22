import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";

const Layout = () => {
  const location = useLocation();
  let mainClass = "";

  if (location.pathname != "/") {
    mainClass = "bg-dark";
  }
  return (
    <div className="app">
      <Header />
      <Main className={mainClass}>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
};

export default Layout;
