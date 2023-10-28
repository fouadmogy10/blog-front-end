import { createAsyncThunk } from "@reduxjs/toolkit";
import base_url from "../../../utils/baseURL";

export const getAllCategories = createAsyncThunk(
    "blog/getAllCategories",
    async (_, { rejectWithValue }) => {
      try {
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        //   },
        // };
        const response = await base_url.get(`/category`);
        return response.data;
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
export const createCategory = createAsyncThunk(
    "blog/createCategory",
    async ({title}, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        };
        const response = await base_url.post(`/category`,{title},config);
        return response.data;
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
export const deleteCategory = createAsyncThunk(
    "blog/deleteCategory",
    async (id, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        };
        const response = await base_url.delete(`/category/${id}`,config);
        return response.data;
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
  const categoryService = {
    getAllCategories,createCategory,deleteCategory
  };
  
  export default categoryService;
  