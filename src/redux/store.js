import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

// Configuration du store Redux
/**
 * Configure et crée le store Redux de l'application.
 * Utilise `configureStore` de Redux Toolkit pour simplifier la configuration.
 * Intègre le reducer d'authentification pour gérer l'état lié à l'authentification.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
