import PropTypes from "prop-types";

function Main({ children, className }) {
  return <main className={`main ${className}`}>{children}</main>;
}

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string, // Add className prop validation
};
Main.defaultProps = {
  className: "",
};

export default Main;
