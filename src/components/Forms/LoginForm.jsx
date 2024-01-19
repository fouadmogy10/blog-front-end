import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../app/features/auth/authSlice";



let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
  });
const LoginForm = () => {
    const { loading,userInfo,userToken, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: async(values) => {
       await dispatch(loginUser(values));
      },
    });
     // redirect authenticated user to profile screen
     useEffect(() => {
       
      if (userToken) {
        navigate('/')
      }
    }, [navigate, userToken])
  
  
  return (
    <form onSubmit={formik.handleSubmit}>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">
              or login with email
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
            />
             <div className="alert-error mt-2 text-red-600  font-semibold">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <Link aria-label="blog"  to="/forget-password" className="text-xs text-gray-500">
                Forget Password?
              </Link>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
            />
             <div className="alert-error mt-2 text-red-600  font-semibold">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>
          <div className="mt-8">
            <button  disabled={loading} className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" type="submit">
            {loading ? (<span className="loading loading-spinner loading-md"></span>) : 'Login'}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link aria-label="blog"  to="/register" className="text-xs text-gray-500 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
         </form>
  )
}

export default LoginForm