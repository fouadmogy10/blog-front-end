import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/7070628_3275434.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import passwordServices from "../app/features/password/passwordServices";
import { clearState } from "../app/features/password/passwordSlice";

let schema = yup.object().shape({
  email: yup.string().email("Email should be valid").required("required"),
});
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.password);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(passwordServices.forgotPassword(values));
      dispatch(clearState());
    },
  });
  return (
    <div className="pt-[100px] min-h-screen  ">
      <div className="flex bg-white rounded-lg min-h-[500px] shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ backgroundImage: `url('${img}')` }}
        ></div>
        <div className="flex justify-center items-center w-full p-8 lg:w-1/2">
          <form className="w-[90%]" onSubmit={formik.handleSubmit}>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <Link aria-label="blog" 
                to="/login"
                className="text-xs text-center text-gray-500 uppercase"
              >
                Remember password
              </Link>
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

              <button
                disabled={loading}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 mt-8"
                type="submit"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Submit"
                )}
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
