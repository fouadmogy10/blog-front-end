import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userServices";
import { toast } from "react-toastify";
import { setUserPhoto, setUsername } from "../auth/authSlice";
import base_url from "../../../utils/baseURL";

const initialState = {
  loading: false,
  userProfile: {
    loading: false,
    profile: {},
  },
  error: null,
  success: false,
};
export const updateProfilePhoto = createAsyncThunk(
  "user/updateProfilePhoto",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await base_url.post(
        `/users/profile/Photo-upload`,
        data,
        config
      );
      if (response.data) {
        dispatch(setUserPhoto(response.data));
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
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ formData, id }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      const { data } = await base_url.put(
        `/users/profile/${id}`,
        formData,
        config
      );
      if (data) {
        dispatch(setUsername(data?.username));
      }
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
export const userProfile = createAsyncThunk(
  "user/getProfile",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.getProfile(id);
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
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getAllUsers();
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
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.deleteUser(id);
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },

    deletePostFromProfile(state, action) {
      const Post = state.userProfile.profile.posts.find(
        (c) => c._id === action.payload
      );
      const PostIndex = state.userProfile.profile.posts.indexOf(Post);

      state.userProfile.profile.posts.splice(PostIndex, 1);
    },
    deleteuserR(state, action) {
      const user = state.users.find((c) => c._id === action.payload);
      const userIndex = state.users.indexOf(user);

      state.users.splice(userIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.userProfile.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        state.userProfile.loading = false;
        state.success = true;
        state.userProfile.profile = payload;
        if (state.success) {
          state.userProfile.posts = state.userProfile.profile?.posts;
        }
      })
      .addCase(userProfile.rejected, (state, { payload }) => {
        state.userProfile.loading = false;
        state.error = payload;
      })

      .addCase(updateProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        if (state.success) {
          let curentUser = JSON.parse(localStorage.getItem("user"));
          let newUser = {
            _id: curentUser._id,
            username: curentUser.username,
            email: curentUser.email,
            profilePhoto: payload.profilePhoto,
            token: curentUser.token,
            isAdmin: curentUser.isAdmin,
          };
          localStorage.setItem("user", JSON.stringify(newUser));
          toast.success("your  photo profile uploaded successfully");
        }
        if (state.success) {
          
        }
      })
      .addCase(updateProfilePhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        if (state.error) {
          toast.error(`${state.error}`);
        }
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userProfile.profile = payload;
        // state.userProfile.profile?.username=payload?.username

        if (state.success) {
          let curentUser = JSON.parse(localStorage.getItem("user"));
          let newUser = {
            _id: curentUser._id,
            username: payload.username,
            email: payload.email,
            profilePhoto: curentUser.profilePhoto,
            isAdmin: curentUser.isAdmin,
            token: curentUser.token,
          };
          localStorage.setItem("user", JSON.stringify(newUser));
          toast.success("your profile updated successfully");
        }
        // if (state.success) {
        //   toast.success("your profile updated successfully");
        // }
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        if (state.error) {
          toast.error(`${state.error}`);
        }
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        if (state.error) {
          toast.error(`${state.error}`);
        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.deletedUser = payload;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        if (state.error) {
          toast.error(`${state.error}`);
        }
      });
  },
});

export const { deletePostFromProfile, deleteuserR } = userSlice.actions;
export default userSlice.reducer;
