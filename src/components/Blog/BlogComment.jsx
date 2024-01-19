import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { BiTrashAlt } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import {
  CreateComment,
  deleteComment,
} from "../../app/features/comment/commentSlice";
import Swal from "sweetalert2";
import UpdateCommentModel from "../models/UpdateCommentModel";
import { deleteCommentFromPost } from "../../app/features/blogs/blogSlice";
import { useState } from "react";
let schema = yup.object().shape({
  text: yup.string().min(4).required("comment is Required"),
});
const BlogComment = ({ comment, userId }) => {
  const dispatch = useDispatch();
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);
  const { loading } = useSelector((state) => state.comment);

  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      text: "",
      postId: id,
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(CreateComment(values));
      resetForm();
    },
  });

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteComment(commentId));
        await dispatch(deleteCommentFromPost(commentId));

        Swal.fire("Deleted!", "Your Comment has been deleted.", "success");
      }
    });
  };
  return (
    <div className="  rounded-lg border p-2 my-4 mx-6">
      <h3 className="font-bold">Discussion</h3>

      <div>
        <div className="flex flex-col">
          {comment?.map((item, idx) => (
            <div className="border rounded-md p-3 ml-3 my-3" key={idx}>
              <div className="flex justify-between items-center ">
                <div className="flex gap-3 items-center">
                  <img
                    src={typeof( item?.user?.profilePhoto)==="string" ?item?.user?.profilePhoto :item?.user?.profilePhoto?.url }
                    className="object-cover w-8 h-8 rounded-full gap-1   border-2 border-emerald-400  shadow-emerald-400"
                  />
                  <h3 className="font-bold">{item?.username}</h3>
                </div>
                {userId == item?.user?._id && (
                  <div className="flex items-center gap-1">
                    <BiTrashAlt
                      color="red"
                      size={24}
                      cursor={"pointer"}
                      onClick={() => {
                        deleteCommentHandler(item._id);
                      }}
                    />
                    <AiFillEdit
                      className=" text-green-500"
                      cursor={"pointer"}
                      size={24}
                      onClick={async () => {
                        await updateCommentHandler(item);
                        document.getElementById("my_modal_45").showModal();
                      }}
                    />
                    {updateComment&&  <UpdateCommentModel
                     commentForUpdate={commentForUpdate}
                     setUpdateComment={setUpdateComment}
                     />
                    }
                   
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center flex-wrap gap-1">
                <p className=" mt-2">{item?.text}</p>
                <p className="mt-2">
                  {item?.createdAt !== "" &&
                    dayjs(item?.createdAt).format(" D MMM, YYYY")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="w-full px-3 my-2">
            <textarea
              className=" rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium  focus:outline-none focus:bg-white"
              name="body"
              typeof="text"
              placeholder="Type Your Comment"
              onChange={formik.handleChange("text")}
              onBlur={formik.handleBlur("text")}
              value={formik.values.text}
            ></textarea>
            <div className="alert-error mt-2 text-red-600  font-semibold">
              {formik.touched.text && formik.errors.text}
            </div>
          </div>

          <div className="w-full flex justify-end px-3">
            <button
              type="submit"
              className="px-2.5 py-1.5 rounded-md  text-sm bg-indigo-900 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                </>
              ) : (
                "Post Comment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogComment;
