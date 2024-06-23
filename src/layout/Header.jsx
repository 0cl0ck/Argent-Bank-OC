import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/authSlice.js";
import logo from "../assets/img/argentBankLogo.png";

/**
 * Composant Header qui affiche la barre de navigation principale de l'application.
 *
 * Utilise `useDispatch` pour dispatcher des actions Redux, `useNavigate` pour la navigation,
 * et `useSelector` pour accéder à l'état d'authentification de l'utilisateur depuis le store Redux.
 * Affiche un logo et un lien vers la page d'accueil. Selon que l'utilisateur est authentifié ou non,
 * il affiche un lien pour se connecter ou un bouton pour se déconnecter. La déconnexion est gérée
 * par la fonction `handleSignOut`, qui dispatch l'action `signOut` et redirige l'utilisateur vers
 * la page d'accueil.
 */
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
