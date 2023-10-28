import React, { useEffect, useState } from "react";
import Start from "../components/Start";
import Main from "../components/Main";
import Top from "../components/Top";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getAllComments } from "../../app/features/comment/commentSlice";
import Swal from "sweetalert2";
// getAllComments
const AllComment = () => {
  let i = 1;
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comment);
  const [Id, setId] = useState(null);
  useEffect(() => {
    dispatch(getAllComments());
  }, []);
  const deleteCommentHandler = async (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover Comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setId(commentId);
        await dispatch(deleteComment(commentId));
        await dispatch(getAllComments());
        setId("rtetrt");
        await Swal.fire("Deleted!", " Comment has been deleted.", "success");
      }
    });
  };
  return (
    <Start>
      <Main title={"Dashboard"} breadcrumb={"All Comments"}>
        <div className="table-data">
          <div className="order text-center">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-gray-500">
                    <th>#</th>
                    <th>img</th>
                    <th>Name</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {comments?.length > 0 ? (
                    comments.map((comment) => (
                      <tr key={comment?._id}>
                        <th>
                          <label>{i++}</label>
                        </th>
                        <td>
                          <div className="flex items-center space-x-3 flex-wrap justify-center">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={comment?.user?.profilePhoto?.url}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{comment?.user?.username}</td>
                        <td className="tooltip1">
                          {comment?.text?.slice(0, 20) + "..."}
                          <span className="tooltiptext">{comment?.text}</span>
                        </td>

                        <th>
                          <div className="flex gap-2">
                            <button
                              className="flex btn btn-ghost btn-sm"
                              // aria-disabled={loading}
                              onClick={()=>deleteCommentHandler(comment?._id)}
                            >
                              <BiTrashAlt color="red" />
                              {Id == comment?._id ? (
                                <>
                                  <span className="loading loading-spinner loading-md"></span>
                                </>
                              ) : (
                                "delete"
                              )}
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>there is no Comments</td>
                    </tr>
                  )}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr className="text-gray-500">
                    <th>#</th>
                    <th>img</th>
                    <th>Name</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </Main>
    </Start>
  );
};

export default AllComment;
