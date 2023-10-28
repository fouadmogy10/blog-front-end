import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import base_url from "../../../utils/baseURL";
import {
  addCommentToPost,
  deleteCommentFromPost,
  updateCommentPost,
} from "../blogs/blogSlice";

const initialState = {
  loading: false,
  comments: [],
  error: null,
  success: false,
};
export const updateComment = createAsyncThunk(
  "blog/updateComment",
  async ({ id, text }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      const response = await base_url.put(
        `/comment/${id}`,
        { text: text },
        config
      );
      dispatch(updateCommentPost(response.data?.updatedComment));
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
export const deleteComment = createAsyncThunk(
  "blog/deleteComment",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      const response = await base_url.delete(`/comment/${id}`, config);
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
export const CreateComment = createAsyncThunk(
  "blog/CreateComment",
  async ({ postId, text }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      const response = await base_url.post(
        `/comment`,
        { postId, text },
        config
      );
      dispatch(addCommentToPost(response.data?.comment));
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
export const getAllComments = createAsyncThunk(
  "blog/getAllComments",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      const response = await base_url.get(`/comment`, config);
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

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateComment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.createdComment = payload?.comment;
        if (state.success) {
          toast.success(`Comment Add Successfully`);
        }
      })
      .addCase(CreateComment.rejected, (state, { payload }) => {
        state.error = true;
        state.loading = null;
        state.message = payload;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
        state.updatedComment = payload?.comment;
        if (state.success) {
          toast.success(`${payload?.message}`);
        }
      })
      .addCase(updateComment.rejected, (state, { payload }) => {
        state.error = !false;
        state.loading = null;
        state.message = payload;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
        state.comments = payload;

      })
      .addCase(getAllComments.rejected, (state, { payload }) => {
        state.error = !false;
        state.loading = null;
        state.message = payload;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      });
  },
});

export default commentSlice.reducer;
