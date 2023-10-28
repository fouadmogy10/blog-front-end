import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../app/features/auth/authSlice'
import userReducer from '../app/features/user/userSlice'
import blogReducer from '../app/features/blogs/blogSlice'
import commentReducer from '../app/features/comment/commentSlice'
import categoryReducer from '../app/features/category/categorySlice'
import passwordSlice from '../app/features/password/passwordSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    blog: blogReducer,
    comment: commentReducer,
    category: categoryReducer,
    password: passwordSlice
  },
})