import base_url from "../../../utils/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";

 const forgotPassword = createAsyncThunk(
  "reset/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await base_url.post(
        "/password/reset-password-link",
        email 
      );
      return data;
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

const getResetPassword = createAsyncThunk(
  "reset/getResetPassword",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const { data } = await base_url.get(
        `/password/reset-password/${id}/${token}`
      );
      return data;
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
const resetPassword = createAsyncThunk(
  "reset/resetPassword",
  async ({ password, id, token }, { rejectWithValue }) => {
    try {
      const { data } = await base_url.post(
        `/password/reset-password/${id}/${token}`,
        { password: password }
      );
      return data;
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
const passwordServices = {
  forgotPassword,
  getResetPassword,
  resetPassword,
};
export default passwordServices;
