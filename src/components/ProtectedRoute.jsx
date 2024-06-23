import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

// Composant ProtectedRoute
/**
 * Composant de route protégée qui conditionne l'accès à ses enfants en fonction de l'état d'authentification.
 * Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de connexion.
 * Utilise `useLocation` pour obtenir l'emplacement actuel et le passer comme état lors de la redirection, permettant un retour après connexion.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {ReactNode} props.children - Les composants enfants qui sont rendus si l'utilisateur est authentifié.
 */
function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
