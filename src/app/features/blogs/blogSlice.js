import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import BlogService from "./blogServices";
import { toast } from "react-toastify";
import { deletePostFromProfile } from "../user/userSlice";
import base_url from "../../../utils/baseURL";

const initialState = {
  loading: false,
  blogs: [],
  PostDetails: [],
  error: null,
  success: null,
  message: null,
};
export const getAllPost = createAsyncThunk("blog/all", async (thunkAPI) => {
  try {
    return await BlogService.getAllPost();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getPost = createAsyncThunk("blog/post", async (id, thunkAPI) => {
  try {
    return await BlogService.getPost(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const CreatPost = createAsyncThunk(
  "blog/Createpost",
  async (data, thunkAPI) => {
    try {
      return await BlogService.CreatPost(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async (data, thunkAPI) => {
    try {
      return await BlogService.updatePost(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updatePostIMG = createAsyncThunk(
  "blog/updatePostIMG",
  async (data, thunkAPI) => {
    try {
      return await BlogService.updatePostIMG(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      const response = await base_url.delete(`/posts/${id}`, config);
      if (response.data) {
         dispatch(deletePostFromBlogs(id)) 
      }
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
export const LikePost = createAsyncThunk(
  "blog/LikePost",
  async (id, thunkAPI) => {
    try {
      return await BlogService.LikePost(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const BlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => {
      state.PostDetails = null;
      state.success = null;
      state.error = null;
      state.createdPost = null;
    },
    deletePostFromBlogs(state, action) {
      const Post = state.blogs.find(
        (c) => c._id === action.payload
      );
      const PostIndex = state.blogs.indexOf(Post);

      state.blogs.splice(PostIndex, 1);
    },

    addCommentToPost(state, action) {
      state.PostDetails.comment.push(action.payload);
    },
    updateCommentPost(state, action) {
      state.PostDetails.comment = state.PostDetails.comment.map((commment) =>
        commment._id === action.payload._id ? action.payload : commment
      );
    },
    deleteCommentFromPost(state, action) {
      const comment = state.PostDetails.comment.find(
        (c) => c._id === action.payload
      );
      const commentIndex = state.PostDetails.comment.indexOf(comment);

      state.PostDetails.comment.splice(commentIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getAllPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.blogs = payload;
        state.success = true;
      })
      .addCase(getAllPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.success = !true;
        state.message = payload;
        if (state.error) {
          toast.error(`someThing Went Wrong`);
        }
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.PostDetails = payload;
      })
      .addCase(getPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload?.message;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
      .addCase(CreatPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreatPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.createdPost = payload;
        if (state.success) {
          toast.success("Post Created Successfully");
        }
      })
      .addCase(CreatPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message = payload;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
      .addCase(updatePost.pending, (state) => {
        state.Uloading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.Uloading = null;
        state.success = true;
        state.PostDetails = payload;
        if (state.success) {
          toast.success("Post Updated Successfully");
        }
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.Uloading = null;
        state.error = payload;
        if (state.error) {
          toast.error(`${state.error}`);
        }
      })
      .addCase(updatePostIMG.pending, (state) => {
        state.Uloading = true;
        state.error = null;
      })
      .addCase(updatePostIMG.fulfilled, (state, { payload }) => {
        state.Uloading = null;
        state.success = true;
        state.PostDetails = payload;
        if (state.success) {
          toast.success("Post image Updated Successfully");
        }
      })
      .addCase(updatePostIMG.rejected, (state, { payload }) => {
        state.Uloading = null;
        state.error = true;
        state.message = payload;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
      .addCase(deletePost.pending, (state) => {
        state.dLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.success = true;
        state.deletedPost = payload;
        state.dLoading = null;
        if (state.success) {
          toast.success("Post deleted Successfully");
        }
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.message = payload;
        state.dLoading = null;
        state.error = true;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      })
      .addCase(LikePost.pending, (state) => {
        state.Lloading = true;
        state.error = null;
      })
      .addCase(LikePost.fulfilled, (state, { payload }) => {
        state.Lloading = false;
        state.success = true;
        state.PostDetails = payload;
      })
      .addCase(LikePost.rejected, (state, { payload }) => {
        state.error = !false;
        state.Lloading = null;
        state.message = payload;
        if (state.error) {
          toast.error(`${state.message}`);
        }
      });
  },
});
export const {
  reset,
  addCommentToPost,
  updateCommentPost,
  deleteCommentFromPost,deletePostFromBlogs
} = BlogSlice.actions;
export default BlogSlice.reducer;
