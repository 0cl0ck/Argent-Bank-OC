import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../apiServices";
import { fetchUserProfile } from "../apiServices";
import { updateUserProfileApi } from "../apiServices";

// Thunk pour gérer la connexion
/**
 * Thunk asynchrone pour la connexion d'un utilisateur.
 * Utilise `loginApi` pour tenter de connecter l'utilisateur avec les données fournies.
 * En cas de succès, retourne les données de l'utilisateur.
 * En cas d'échec, rejette la promesse avec un message d'erreur.
 * @param {Object} userData - Contient l'email et le mot de passe de l'utilisateur.
 * @param {function} rejectWithValue - Fonction pour retourner une valeur en cas de rejet.
 * @returns {Promise<Object>} Les données de l'utilisateur en cas de succès.
 */
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginApi(userData.email, userData.password);

      if (response.status === 200) {
        const data = response.body;
        return data;
      } else {
        return rejectWithValue("Failed to log in"); // Utilisez rejectWithValue pour gérer les échecs
      }
    } catch (error) {
      console.error("Error caught", error);
      const message = error.response
        ? error.response.data.message
        : error.message;
      return rejectWithValue(message);
    }
  }
);

// Thunk pour mettre à jour le profil de l'utilisateur
/**
 * Thunk asynchrone pour mettre à jour le profil de l'utilisateur.
 * Utilise `updateUserProfileApi` pour mettre à jour le profil avec les données fournies.
 * En cas de succès, met à jour le profil de l'utilisateur dans l'état et retourne les nouvelles données.
 * En cas d'échec, rejette la promesse avec un message d'erreur.
 * @param {Object} params - Contient les données de l'utilisateur et le token d'authentification.
 * @param {function} dispatch - Fonction dispatch de Redux pour mettre à jour l'état.
 * @param {function} rejectWithValue - Fonction pour retourner une valeur en cas de rejet.
 * @returns {Promise<Object>} Les nouvelles données de l'utilisateur en cas de succès.
 */
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userData, token }, { dispatch, rejectWithValue }) => {
    try {
      const data = await updateUserProfileApi(userData, token);
      if (data.status === 200) {
        dispatch(setUser(data.body));
        return data.body;
      } else {
        return rejectWithValue(data.message || "Failed to update user profile");
      }
    } catch (error) {
      console.error("Error caught in updateUserProfile", error);
      return rejectWithValue(error.toString());
    }
  }
);

// Initialisation de l'état pour l'authentification
/**
 * État initial pour la gestion de l'authentification.
 * Contient les informations sur l'utilisateur, le token, le statut d'authentification, le statut de la requête et une erreur potentielle.
 */
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

// Slice pour l'authentification
/**
 * Slice Redux pour la gestion de l'authentification.
 * Contient les reducers pour la connexion, la déconnexion, et la mise à jour des données de l'utilisateur.
 * Gère également les actions asynchrones pour la connexion et la mise à jour du profil de l'utilisateur.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload && action.payload.token) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.status = "succeeded";
          localStorage.setItem("authToken", action.payload.token);
        } else {
          state.status = "failed";
          state.error = "Invalid payload";
        }
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        console.error("Failed to update user:", action.payload);
      });
  },
});

export const { signIn, signOut, setUser } = authSlice.actions;
export default authSlice.reducer;
