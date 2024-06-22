import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Router from "./routes/Router.jsx";
import { fetchUserProfile } from "./apiServices";
import { signIn } from "./redux/authSlice.js";
import "./sass/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Vérifier le token dans le localStorage
const token = localStorage.getItem("authToken");
if (token) {
  store.dispatch(signIn({ token }));
  store.dispatch(fetchUserProfile(token));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
