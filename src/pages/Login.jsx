import { AiOutlineGoogle } from "react-icons/ai"; 
import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../app/features/auth/authSlice";
import Lottie from "../components/Lottie";
import Meta from "../components/Meta";
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
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


  
// if (userToken) {
//   return (
//     <Lottie url ={"https://lottie.host/e05fce6f-d76a-49c9-800c-2e09f5a29938/QiNEwZFXvF.json"}/>
//   )
// }
  return (
    <>
    <Meta title={"Login Page"}/>
    <div className="pt-[100px] min-h-screen  ">
      <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{"backgroundImage":"url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"}}
        ></div>
        <form className="w-full p-8 lg:w-1/2" onSubmit={formik.handleSubmit}>
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <div className="px-4 py-3">
              <AiOutlineGoogle  className="h-6 w-6" color="red"/>
              
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
              Sign in with Google
            </h1>
          </a>
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
      </div>
    </div>
    </>
  );
};

export default Login;
