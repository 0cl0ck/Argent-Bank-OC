import PropTypes from "prop-types";

/**
 * Composant Main qui encapsule le contenu principal de la page.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les enfants à rendre à l'intérieur de la balise <main>.
 * @param {string} props.className - Une classe CSS supplémentaire pour styliser le composant.
 * @returns {JSX.Element} Le composant Main rendu.
 */
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
