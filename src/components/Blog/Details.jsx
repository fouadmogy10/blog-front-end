import { AiFillLike } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import React, { useState } from "react";
import BlogComment from "./BlogComment";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  LikePost,
  deletePost,
  updatePostIMG,
} from "../../app/features/blogs/blogSlice";
import { BiTrashAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import PostDetailsModel from "../models/PostDetailsModel";
import Swal from "sweetalert2";
import DetailsLoader from "../Skeleton/DetailsSkelton.jsx";

const Details = ({ post, id }) => {
  const [Id, setId] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const { dLoading, loading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const updateImg = async (data) => {
    if (data.value) {
      const formData = new FormData();
      formData.append("image", data.value);
      await dispatch(updatePostIMG({ id: data.id, data: formData }));
    }
  };
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
        setId(id);
        await dispatch(deletePost(postId));

        setId("rtetrt");

        await Swal.fire("Deleted!", "Your Post has been deleted.", "success");

        Navigate("/");
      }
    });
  };

  return (
    <>
      {loading ? (
        <DetailsLoader />
      ) : (
        <>
          <main className="mt-10">
            <div className="mb-4 md:mb-0 w-full mx-auto relative">
              <div className="px-4 lg:px-0">
                <h2 className="text-4xl font-semibold leading-tight">
                  {post?.title}
                </h2>
                <p className="capitalize py-5">
                  <span className="font-bold">publish at - </span>
                  {post?.createdAt !== "" &&
                    dayjs(post?.createdAt).format(" D MMM, YYYY")}
                </p>
                <div className="flex justify-between items-center flex-wrap">
                  <span className="py-2 px-4 bg-[#077c8998] text-white rounded-tr-2xl rounded-bl-2xl  inline-flex items-center justify-center mb-2">
                    {post?.category}
                  </span>
                  {userInfo?._id == post?.user?._id && (
                    <label
                      className="py-2 px-4  bg-gray-500 mt-5 mb-5 rounded-xl text-white cursor-pointer"
                      htmlFor={"img"}
                    >
                      Edit Image
                    </label>
                  )}
                </div>
                <input
                  type="file"
                  name=""
                  id="img"
                  hidden
                  onChange={async (e) => {
                    updateImg({ value: e.target.files[0], id: post._id });
                  }}
                />
              </div>

              <img
                src={post?.image?.url}
                className="w-full object-contain rounded-2xl "
                style={{ maxHeight: " 28em", borderRadius: "6rem" }}
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-12">
              <div className="px-4 lg:px-0 mt-12  text-lg leading-relaxed w-full lg:w-3/4">
                <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
                  <p>{post?.description}</p>
                </div>
              </div>

              <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                <div className="p-4 border-t border-b md:border md:rounded">
                  <Link to={`/profile/${post?.user?.id}`}>
                    <div className="flex py-2">
                      <img
                        src={post?.user?.profilePhoto?.url}
                        className="h-10 w-10 rounded-full mr-2 object-cover"
                      />
                      <div>
                        <p className="font-semibold  text-sm">
                          {" "}
                          {post?.user?.username}{" "}
                        </p>
                        <p className="font-semibold  text-xs">
                          {" "}
                          {post?.user?.job}{" "}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <p className=" py-3">{post?.user?.bio}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center flex-wrap gap-2  my-5">
              <button
                className="py-3 px-7 bg-black rounded btn-sm flex items-center text-white gap-2 uppercase btn-ghost transition-all duration-700"
                onClick={() => {
                  if (userInfo) {
                    dispatch(LikePost(post?._id));
                  } else {
                    Navigate("/login");
                  }
                }}
              >
                <AiFillLike
                  size={20}
                  cursor={"pointer"}
                  color={
                    post?.likes?.some((item) => item == userInfo?._id)
                      ? "blue"
                      : "gray"
                  }
                />
                <p className="mb-0">{post?.likes?.length} likes</p>
              </button>
              <div className="flex gap-2 flex-wrap">
                {userInfo?._id == post?.user?._id && (
                  <>
                  
                    <div className=" flex items-center hover:text-white  border-2 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer transition-all duration-500 hover:bg-red-600 "
                    onClick={() => {
                      deletePostHandler(id);
                    }}
                    aria-disabled={dLoading}
                    >
                       <BiTrashAlt  />
                      {Id == id ? (
                        <>
                          <span className="loading loading-spinner loading-md"></span>
                        </>
                      ) : (
                        "delete"
                      )}
                    </div>
                   
                    <div className=" flex items-center hover:text-white  border-2 border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer transition-all duration-500 hover:bg-green-600 "
                     onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                    >
                     <AiFillEdit className=" text-green-500" size={30} /> Edit
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>

          <BlogComment
            comment={post?.comment ? post?.comment : []}
            userId={userInfo?._id}
          />
          {loading ? (
            ""
          ) : (
            <PostDetailsModel
              tit={post?.title}
              desc={post?.description}
              cat={post?.category}
            />
          )}
        </>
      )}
    </>
  );
};

export default Details;
