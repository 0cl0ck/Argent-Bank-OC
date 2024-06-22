import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../apiServices";
import { fetchUserProfile } from "../apiServices";
import { updateUserProfileApi } from "../apiServices";

// Thunk pour gérer la connexion
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

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userData, token }, { dispatch, rejectWithValue }) => {
    try {
      const data = await updateUserProfileApi(userData, token); // Pas besoin d'appeler .json() ici
      if (data.status === 200) {
        dispatch(setUser(data.body)); // Utilise data.body pour dispatcher les données utilisateur.
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

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signIn(state, action) {
//       state.isAuthenticated = true;
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//     },
//     signOut: (state) => {
//       state.isAuthenticated = false;
//       state.token = null;
//       state.user = null;
//     },
//     setUser: (state, action) => {
//       console.log("Setting user", action.payload);
//       state.user = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         if (action.payload && action.payload.token) {
//           state.isAuthenticated = true;
//           state.token = action.payload.token;
//           // Ici, tu ne définis pas `state.user` parce que tu n'as pas encore les informations de l'utilisateur
//           state.status = "succeeded";
//           localStorage.setItem("authToken", action.payload.token);
//           // Dispatch fetchUserProfile ici si tu es sûr que le token est maintenant stocké et prêt à être utilisé
//         } else {
//           state.status = "failed";
//           state.error = "Invalid payload";
//         }
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.user = { ...state.user, ...action.payload }; // Assure-toi que la structure de l'action.payload correspond à ce que ton API renvoie
//       })

//       .addCase(updateUserProfile.rejected, (state, action) => {
//         console.error("Failed to update user:", action.payload);
//       });
//   },
// });

// export const { signIn, signOut, setUser } = authSlice.actions;
// export default authSlice.reducer;
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
