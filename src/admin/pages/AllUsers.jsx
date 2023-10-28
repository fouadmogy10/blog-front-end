import { AiOutlineEye } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import Start from "../components/Start";
import Main from "../components/Main";
import Top from "../components/Top";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, deleteuserR, getAllUsers } from "../../app/features/user/userSlice";
import Swal from "sweetalert2";
import { getAllCategories } from "../../app/features/category/categoryServices";
import { getAllComments } from "../../app/features/comment/commentSlice";
import { getAllPost } from "../../app/features/blogs/blogSlice";
const AllUsers = () => {
  let i = 1;
  const [Id, setId] = useState(null);
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCategories());
    dispatch(getAllComments());
    dispatch(getAllPost());
  }, []);
  const deletePostHandler = async (userId) => {
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
        setId(userId);
        await dispatch(deleteUser(userId));
        await dispatch(deleteuserR(userId));
        setId("rtetrt");
        await Swal.fire("Deleted!", "Your Post has been deleted.", "success");
      }
    });
  };
  return (
    <Start>
      <Main title={"Dashboard"} breadcrumb={"All Users"}>
        <Top />
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
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {users?.length > 0 ? (
                    users.map((item) => (
                      <tr key={item?._id}>
                        <th>
                          <label>{i++}</label>
                        </th>
                        <td>
                          <div className="flex items-center space-x-3 flex-wrap justify-center">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={item?.profilePhoto?.url}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item?.username}</td>
                        <td className="px-2" style={{padding:"0 10px"}}>{item?.email}</td>
                        <th>
                          <div className="flex gap-2">
                            <button
                              className="flex btn btn-ghost btn-sm"
                              onClick={() => deletePostHandler(item?._id)}
                              aria-disabled={loading}
                            >
                              <BiTrashAlt color="red" />
                              {Id == item?._id ? (
                                <>
                                  <span className="loading loading-spinner loading-md"></span>
                                </>
                              ) : (
                                "delete"
                              )}
                            </button>
                            <Link to={`/profile/${item._id}`} target="_blank">
                              <button className="flex flex-nowrap btn btn-ghost btn-sm">
                                <AiOutlineEye color="#3c91e6" />
                                View
                              </button>
                            </Link>
                          </div>
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>there is no Users</td>
                    </tr>
                  )}
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

export default AllUsers;
