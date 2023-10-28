import React, { useEffect, useState } from "react";
import Start from "../components/Start";
import Main from "../components/Main";
import Top from "../components/Top";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPost } from "../../app/features/blogs/blogSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Posts = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);
  const [Id, setId] = useState(null);
  let i = 1;
  useEffect(() => {
    dispatch(getAllPost());
  }, []);
  const deletePostHandler = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover Post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setId(postId);
        await dispatch(deletePost(postId));
        setId("rtetrt");

        await Swal.fire("Deleted!", "Your Post has been deleted.", "success");
      }
    });
  };
  return (
    <Start>
      <Main title={"Dashboard"} breadcrumb={"All Posts"}>
        <div className="table-data">
          <div className="order text-center">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-gray-500">
                    <th>#</th>
                    <th>IMG</th>
                    <th>user</th>
                    <th>Post Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {blogs.map((item) => {
                    return (
                      <tr key={item?._id}>
                        <th>
                          <label>{i++}</label>
                        </th>
                        <td>
                          <div className="flex items-center space-x-3 flex-wrap justify-center">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={item?.user?.profilePhoto?.url}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item?.user?.username}</td>
                        <td>{item?.title}</td>
                        <th>
                          <div className="flex gap-2">
                            <button
                              onClick={() => deletePostHandler(item?.id)}
                              className="flex btn btn-ghost btn-sm"
                            >
                              <BiTrashAlt color="red" />
                              {Id == item?.id ? (
                                <>
                                  <span className="loading loading-spinner loading-md"></span>
                                </>
                              ) : (
                                "delete"
                              )}
                            </button>
                            <Link to={`/blogs/${item?._id}`} target="_blank">
                              <button className="btn btn-ghost btn-sm">
                                <AiOutlineEye color="#3c91e6" />
                                View
                              </button>
                            </Link>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr className="text-gray-500">
                    <th>#</th>
                    <th>img</th>
                    <th>Name</th>
                    <th>Email</th>
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

export default Posts;
