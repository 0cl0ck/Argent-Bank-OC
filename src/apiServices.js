import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = "http://localhost:3001/api/v1";

/**
 * Fonction de connexion avec une requête POST à l'endpoint ../login pour authentifier l'utilisateur.
 *
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<object>} La réponse de l'API en format JSON.
 * @throws {Error} Si la réponse du réseau n'est pas correcte.
 */
export const loginApi = (email, password) => {
  return fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

/**
 * Fonction pour récupérer les détails du profil de l'utilisateur avec une requête POST.
 * Utilise createAsyncThunk pour gérer les requêtes asynchrones avec Redux Toolkit.
 *
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @returns {object} Les détails du profil de l'utilisateur.
 * @throws {Error} Si la récupération du profil échoue.
 */
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data.body;
      } else {
        throw new Error(data.message || "Failed to fetch user profile");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Fonction pour mettre à jour les détails du profil de l'utilisateur avec une requête PUT.
 *
 * @param {object} userData - Les nouvelles données du profil de l'utilisateur.
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @returns {Promise<object>} La réponse de l'API en format JSON.
 * @throws {Error} Si la mise à jour du profil échoue.
 */
export const updateUserProfileApi = (userData, token) => {
  return fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Failed to update profile");
    }
  });
};
