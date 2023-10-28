import React from "react";
import Start from "../components/Start";
import Main from "../components/Main";
import Top from "../components/Top";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCategory } from "../../app/features/category/categoryServices";
import { useDispatch, useSelector } from "react-redux";
let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
});

const AddCategory = () => {
  const { loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: async(values,{resetForm}) => {
     await dispatch(createCategory(values));
     resetForm()
    },
  });
  return (
    <Start>
      <Main title={"Dashboard"} breadcrumb={"Add Category"}>
        <div className="table-data">
          <div className="order text-center">
            <form onSubmit={formik.handleSubmit}>
              <h2 className="text-2xl font-semibold py-5">Add New Category</h2>
              <input
              name="title"
                type="text"
                placeholder="Enter Category Title"
                className="input input-bordered mx-auto md:w-[80%] w-full mb-5 text-black"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
               <div className="alert-error mt-2 text-red-600  font-semibold">
                {formik.touched.title && formik.errors.title}
              </div>
              <button disabled={loading} className="w-[25%] mx-auto h-[36px] py-[3px] px-[16px] rounded-3xl bg-[#3c91e6] text-white font-extrabold" type="submit">
              {loading ? (<span className="loading loading-spinner loading-md"></span>) : 'Add'}
              </button>
            </form>
          </div>
        </div>
      </Main>
    </Start>
  );
};

export default AddCategory;
