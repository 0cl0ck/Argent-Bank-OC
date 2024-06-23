import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Router from "./routes/Router.jsx";
import { fetchUserProfile } from "./apiServices";
import { signIn } from "./redux/authSlice.js";
import "./sass/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Vérifie le token dans le localStorage et initialise l'état d'authentification si le token est présent
const token = localStorage.getItem("authToken");
if (token) {
  store.dispatch(signIn({ token }));
  store.dispatch(fetchUserProfile(token));
}

/**
 * Rend l'application React dans le DOM.
 * Utilise le Provider de React Redux pour fournir le store à l'ensemble de l'application.
 * Le Router gère les différentes routes de l'application.
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
