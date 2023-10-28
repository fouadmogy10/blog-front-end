import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import passwordServices from "../app/features/password/passwordServices";
import Meta from "../components/Meta";
import Lottie from "../components/Lottie";
import { clearState } from "../app/features/password/passwordSlice";

let schema = yup.object().shape({
  password: yup.string().required("required"),
});
const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading,Rsuccess, error,Gerror } = useSelector((state) => state.password);
  const { id, token } = useParams();
  useEffect(() => {
    dispatch(passwordServices.getResetPassword({ id, token }));
    dispatch(clearState())
  }, [id, token]);

  const formik = useFormik({
    initialValues: {
      password: "",
      id,
      token,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(passwordServices.resetPassword(values));
    },
  });

  useEffect(() => {
    validate()
  }, [Rsuccess])
  const validate =async()=>{
    if (Rsuccess) {
      await navigate("/login")
      dispatch(clearState())
    }
  }
  return (
    <>
      {Gerror ? (
        <div className="min-h-screen flex items-center justify-center">
          <Meta title={"reset Page"} />
          <Lottie
            url={"https://lottie.host/e05fce6f-d76a-49c9-800c-2e09f5a29938/QiNEwZFXvF.json"}
          />
        </div>
      ) : (
        <>
          {" "}
          <div className="pt-[100px] min-h-screen  ">
            <div className="flex bg-white rounded-lg min-h-[400px] shadow-2xl overflow-hidden mx-auto  max-w-[400px]">
              <div className="flex justify-center items-center w-full  ">
                <form className="w-[90%]" onSubmit={formik.handleSubmit}>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      New Password
                    </label>
                    <input
                      className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      value={formik.values.password}
                    />
                    <div className="alert-error mt-2 text-red-600  font-semibold">
                      {formik.touched.password && formik.errors.password}
                    </div>
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
                        "Save"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
