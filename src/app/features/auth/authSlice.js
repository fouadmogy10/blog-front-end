import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await authService.login({ email, password });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      return await authService.register({ username, email, password });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);
const initialState = {
  loading: false,
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null, // for user object
  userToken: localStorage.getItem("user")
    ? localStorage.getItem("userToken")
    : null, // for storing the JWT

  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserPhoto(state, action) {
      state.userInfo.profilePhoto = action.payload?.profilePhoto;
    },
    setUsername(state, action) {
      state.userInfo.username = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userToken"); // deletes token from storage
      localStorage.removeItem("user"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    GoofleSignInStart: (state) => {
      state.Gloading = true;
      state.error = null;
    },
    GoofleSignInSuccess: (state, action) => {
      console.log(action);
      state.userInfo = action.payload;
      state.userToken = action.payload?.token;
      state.Gloading = false;
      state.error = null;
    },
    GoofleSignInFailure: (state, action) => {
      state.Gloading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload?.token;
        state.success = true;
        if (state.success) {
          toast.success(`🦄 Welcome in our site`);
        }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        if (state.error) {
          toast.error(`${state.error}`);
        }
      })

      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
        if (state.success) {
          toast.success(`🦄 Register Successfully`);
        }
      })
      .addCase(RegisterUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  logout,
  setUserPhoto,
  setUsername,
  GoofleSignInStart,
  GoofleSignInSuccess,
  GoofleSignInFailure,
} = authSlice.actions;
export default authSlice.reducer;
