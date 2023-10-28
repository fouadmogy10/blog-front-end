import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { updatePost } from "../../app/features/blogs/blogSlice";
import { useState } from "react";

const PostDetailsModel = ({ tit, desc, cat }) => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setformData] = useState({
    title: tit,
    description: desc,
    category: cat,
  });
  const { title, description, category } = formData;
  const onchange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
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
              value={title}
              onChange={onchange}
            />
          </div>
          <div className="mb-5">
            <select
              id="category"
              name="category"
              className="select select-bordered w-full  rounded-2xl"
              defaultValue={category}
              onChange={onchange}
            >
              <option disabled className="select-md" value={category}>
              {category}
              </option>
              {categories?.map((item) => {
              
              return (
                <option key={item._id} value={item?.title}>
                  {item?.title}
                </option>
              );
            })}
            </select>
          </div>
          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              className="appearance-none block w-full text-base font-medium border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
              value={formData.description}
              onChange={onchange}
            ></textarea>
          </div>

          <div className="modal-action ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button
                className="btn rounded-lg"
                onClick={() => {
                  dispatch(updatePost({ title, description, category, id }));
                }}
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PostDetailsModel;
