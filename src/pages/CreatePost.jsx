import React, { useEffect, useState } from "react";
import CommonSection from "../components/commonSection/CommonSection";
import { useFormik } from "formik";
import * as yup from "yup";
import { CreatPost } from "../app/features/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import Lottie from "../components/Lottie";
let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description: yup.string().required("description is Required"),
  category: yup.string().required("category is Required"),
});

const CreatePost = () => {
  const [image, setimage] = useState(null);
  const [File, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blog);
  const { categories } = useSelector((state) => state.category);
  const { userInfo } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      if (File) {
        await dispatch(CreatPost({ ...values, image: File }));
      }
      resetForm();
    },
  });
useEffect(() => {
  window.scrollTo(0,0)
}, [])
if (!userInfo) {
  return (
    <>
    <Meta title={"Create Post"}/>
    <Lottie url ={"https://lottie.host/e05fce6f-d76a-49c9-800c-2e09f5a29938/QiNEwZFXvF.json"}/>
    </>
  )
}
  return (
    <>
    <Meta title={"Create Post"}/>
      <CommonSection Documents={"Create Post"} href="/post/create" />
      <div className="flex items-center justify-center py-10">
        <div className="mx-auto w-full max-w-[550px] bg-primary rounded-lg border-2 shadow-2xl">
          <form className="py-4 px-9" onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium "
              >
                Post Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Post Title"
                className="w-full rounded-md border b py-3 px-6 text-base font-medium  outline-none  focus:shadow-md"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
              <div className="alert-error mt-2 text-red-600  font-semibold">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
            <div className="mb-5">
              <select
              name="category"
                className="select select-bordered w-full md:max-w-sm rounded-2xl"
                defaultValue={""}
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
              >
                <option disabled>Category</option>
                {categories?.map((item) => {
                  return (
                    <option key={item._id} value={item?.title}>
                      {item?.title}
                    </option>
                  );
                })}
              </select>

              <div className="alert-error mt-2 text-red-600  font-semibold">
                {formik.touched.category && formik.errors.category}
              </div>
            </div>

            <div className="mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Description
              </label>
              <textarea
                rows="5"
                className="appearance-none block w-full text-base font-medium border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                value={formik.values.description}
              ></textarea>
              <div className="alert-error mt-2 text-red-600  font-semibold">
                {formik.touched.description && formik.errors.description}
              </div>
            </div>
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold ">
                Upload File
              </label>

              <div className="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                  onChange={(e) => {
                    setimage(e.target?.files[0]?.name);
                    setFile(e.target?.files[0]);
                  }}
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold ">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium ">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium ">
                      Browse
                    </span>
                  </div>
                </label>
              </div>

              {image && (
                <div className="mb-5 rounded-md  py-4 px-8">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium ">
                      {image}
                    </span>
                    <button className="" onClick={() => setimage(null)}>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center ">
              <button
                type="submit"
                className="btn rounded-xl px-4 py-2"
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
