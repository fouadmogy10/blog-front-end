import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import passwordServices from "./passwordServices";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: "",
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    clearState: (state) => {
      state.success = null;
      state.error = null;
      state.loading = null;
      state.Rsuccess = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(passwordServices.forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        passwordServices.forgotPassword.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.success = true;
          state.message = payload?.message;
          if (state.success) {
            toast.success(`${state.message}`);
          }
        }
      )
      .addCase(
        passwordServices.forgotPassword.rejected,
        (state, { payload }) => {
          state.error = true;
          state.success = null;
          state.loading = null;
          state.message = payload;
          if (state.error) {
            toast.error(`${state.message}`);
          }
        }
      )
      .addCase(passwordServices.getResetPassword.pending, (state) => {
        state.loading = true;
        state.Gerror = null;
      })
      .addCase(
        passwordServices.getResetPassword.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.success = true;
          state.message = payload?.message;
        }
      )
      .addCase(
        passwordServices.getResetPassword.rejected,
        (state, { payload }) => {
          state.Gerror = true;
          state.Rsuccess = null;
          state.loading = null;
          state.message = payload;
          if (state.Gerror) {
            toast.error(`${state.message}`);
          }
        }
      )
      .addCase(passwordServices.resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        passwordServices.resetPassword.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.Rsuccess = true;
          state.message = payload?.message;
          if (state.Rsuccess) {
            toast.success(`${state.message}`);
          }
        }
      )
      .addCase(
        passwordServices.resetPassword.rejected,
        (state, { payload }) => {
          state.error = true;
          state.success = null;
          state.loading = null;
          state.message = payload;
          if (state.error) {
            toast.error(`${state.message}`);
          }
        }
      );
  },
});

export const { clearState } = passwordSlice.actions;
export default passwordSlice.reducer;
