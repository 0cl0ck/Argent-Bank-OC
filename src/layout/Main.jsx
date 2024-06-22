import React from "react";
import PropTypes from "prop-types";

function Main({ children, className }) {
  return <main className={`main ${className}`}>{children}</main>;
}

Main.propTypes = {
  children: PropTypes.node,
};
Main.defaultProps = {
  className: "",
};

export default Main;
