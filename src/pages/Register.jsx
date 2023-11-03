import { FaInfoCircle } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../app/features/auth/authSlice";
import { toast } from "react-toastify";
import Lottie from "../components/Lottie";
import Meta from "../components/Meta";
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
  username: yup.string().min(4).max(24).required("UserName is Required"),
  confirmP: yup.string().required("Confirm Password is Required"),
});

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {
  const userRef = useRef();
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmP: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const v1 = USER_REGEX.test(values.username);
      const v2 = PWD_REGEX.test(values.password);
      if (!v1 || !v2) {
        toast.error("Invalid Entry");
        return;
      }
      await dispatch(RegisterUser(values));

      // if (values.password !== values.confirmP) {
      //   toast.warning("Password and Confirm Password not the same");
      // } else {
      //   await dispatch(RegisterUser(values));
      // }
    },
  });
  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
    // redirect authenticated user to profile screen
    // if (userInfo) navigate("/");
  }, [navigate, userInfo, success]);
  useEffect(() => {
    setValidName(USER_REGEX.test(formik.values.username));
  }, [USER_REGEX.test(formik.values.username)]);



  useEffect(() => {
    setValidPwd(PWD_REGEX.test(formik.values.password));
    setValidMatch(formik.values.password === formik.values.confirmP);
  }, [formik.values.password, formik.values.confirmP]);

  if (userInfo) {
    return (
      <>
      <Meta title={"Register Page"}/>
      <Lottie url ={"https://lottie.host/e05fce6f-d76a-49c9-800c-2e09f5a29938/QiNEwZFXvF.json"}/>
      </>
    )
  }
  return (
   <>
   <Meta title={"Register Page"}/>
    <div className="pt-[100px] min-h-screen  ">
      <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <form className="w-full p-8 lg:w-1/2" onSubmit={formik.handleSubmit}>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-center text-gray-500 uppercase">
              Register
            </span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Name
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              name="username"
              ref={userRef}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              placeholder="Enter username"
              onChange={formik.handleChange("username")}
              onBlur={formik.handleBlur("username")}
              value={formik.values.username}
              onFocus={() => setUserFocus(true)}
            />
            <div className="alert-error mt-2 text-red-600  font-semibold">
              {formik.touched.username && formik.errors.username}
            </div>
            <p
              id="uidnote"
              className={
                userFocus && formik.values.username && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FaInfoCircle />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
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
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
            />
            <div className="alert-error mt-2 text-red-600  font-semibold">
              {formik.touched.password && formik.errors.password}
            </div>
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FaInfoCircle />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              name="confirmP"
              placeholder="confirmP"
              onChange={formik.handleChange("confirmP")}
              onBlur={formik.handleBlur("confirmP")}
              value={formik.values.confirmP}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
            />
            <div className="alert-error mt-2 text-red-600  font-semibold">
              {formik.touched.confirmP && formik.errors.confirmP}
            </div>
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              Must match the first password input field.
            </p>
          </div>
          <div className="mt-8">
            <button
              disabled={loading}
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link aria-label="blog"  to="/login" className="text-xs text-gray-500 uppercase">
              or Login
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
   </>
  );
};

export default Register;
