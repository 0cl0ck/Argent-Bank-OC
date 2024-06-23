import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";

/**
 * `Layout` est un composant fonctionnel qui sert de squelette pour la mise en page de l'application.
 * Il intègre les composants `Header`, `Main`, et `Footer` pour construire la structure de base de la page.
 *
 * Utilise `useLocation` de `react-router-dom` pour accéder au chemin actuel et ajuster dynamiquement
 * la classe du composant `Main` en fonction de la route. Ceci permet d'appliquer un style spécifique
 * aux pages qui ne sont pas la page d'accueil.
 *
 * Le composant `Outlet` est utilisé à l'intérieur de `Main` pour rendre les composants enfants spécifiques
 * à chaque route, permettant ainsi une navigation et un rendu basés sur les routes au sein de la section principale.
 *
 * @returns {JSX.Element} Le JSX du composant `Layout`, incluant `Header`, `Main` avec `Outlet`, et `Footer`.
 */
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
