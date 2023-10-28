import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryService from "./categoryServices";

const initialState = {
  loading: false,
 categories:[],
  error: null,
  success: false, 
  message: "", 
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    deleteCat(state, action) {
      const category = state.categories.find(
        (c) => c._id === action.payload
      );
      const categoryIndex = state.categories.indexOf(category);

      state.categories.splice(categoryIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryService.getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryService.getAllCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
        state.success = true;
        // if (state.success) {
        //   toast.success(`🦄 Welcome in our site`);
        // }
      })
      .addCase(categoryService.getAllCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
      .addCase(categoryService.createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryService.createCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.Createdcategory = payload;
        state.success = true;
        if (state.success) {
          toast.success(`Category add successfully`);
        }
      })
      .addCase(categoryService.createCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
      .addCase(categoryService.deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryService.deleteCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.deletedcategory = payload;
        state.success = true;
        if (state.success) {
          toast.success(`Category deleted successfully`);
        }
      })
      .addCase(categoryService.deleteCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
  },
});

export const { deleteCat } = categorySlice.actions;
export default categorySlice.reducer;
