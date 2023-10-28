import { AiFillEdit, AiOutlineEye } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostFromProfile,
  userProfile,
} from "../app/features/user/userSlice";
import { BiTrashAlt } from "react-icons/bi";
import { deletePost } from "../app/features/blogs/blogSlice";
import ProfileImgModel from "../components/models/ProfileImgModel";
import ProfileDescModel from "../components/models/ProfileDescModel";
import ProfileSkelton from "../components/Skeleton/ProfileSkelton";
import Meta from "../components/Meta";
const Profile = () => {
  let i = 1;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { userProfile: profile,loading } = useSelector((state) => state.user);
  const { dLoading } = useSelector((state) => state.blog);
  const [Id, setId] = useState(null);
  useEffect(() => {
    dispatch(userProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Meta
        title={
          profile?.profile?.username
            ? profile?.profile?.username+"s profile"
            : ""
        }
      />
      {profile.loading ? (
        <ProfileSkelton />
      ) : (
        <>
          <div className="container">
            <div className=" m-4     sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16  shadow-xl rounded-lg bg-primary">
              <div className="rounded-t-lg h-32 overflow-hidden">
                <img
                  className="object-cover object-top w-full"
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  alt="Mountain"
                />
              </div>
              <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full ">
                <div className="relative">
                  <img
                    className="object-cover object-center h-32 w-full rounded-full"
                    src={
                      userInfo?._id == id
                        ? userInfo?.profilePhoto?.url
                        : profile?.profile?.profilePhoto?.url
                    }
                    alt="Woman looking front"
                  />
                  {userInfo?._id == id && (
                    <div className="absolute bottom-0 right-0  p-1 rounded-full bg-primary cursor-pointer">
                      {
                        loading?( <span className="loading loading-spinner loading-md"></span>):(
                          <AiFillEdit
                        className=" text-green-500"
                        size={30}
                        onClick={() =>
                          document.getElementById("my_modal_5").showModal()
                        }
                        />
                        )
                      }
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center mt-2">
                <h2 className="font-semibold">{profile?.profile?.username}</h2>
                <p className="font-semibold">
                  {profile?.profile?.job ? profile?.profile?.job : "Bloger"}
                </p>
                <p className="px-0 sm:px-5">{profile?.profile?.bio}</p>
              </div>

              <div className="p-4 border-t mx-8 mt-2">
                {userInfo?._id == id && (
                  <button
                    className="w-1/2 block mx-auto rounded-full btn hover:shadow-lg font-semibold  px-6 py-2"
                    onClick={() =>
                      document.getElementById("my_modal_6").showModal()
                    }
                  >
                    Update Profile
                  </button>
                )}
              </div>
            </div>

            {profile?.posts?.length > 0 ? (
              <>
                <div className="overflow-x-auto my-20 ">
                  <table className="table text-center">
                    {/* head */}
                    <thead>
                      <tr className="text-gray-500">
                        <th>#</th>
                        <th>img</th>
                        <th>Title</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {profile?.profile?.posts?.map((item, idx) => {
                        return (
                          <tr key={idx} className="hover">
                            <th>
                              <label>{i++}</label>
                            </th>
                            <td>
                              <div className="flex items-center space-x-3 flex-wrap justify-center ">
                                <div className="avatar relative">
                                  <div className="mask mask-squircle w-12 h-12 ">
                                    <img
                                      src={item?.image?.url}
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{item?.title}</td>

                            <th>
                              <div className="flex gap-2 justify-center items-center">
                                {userInfo?._id == id && (
                                  <>
                                    <button
                                      className="py-3 px-7 bg-black rounded btn-sm flex items-center text-white gap-2 uppercase btn-ghost transition-all duration-700"
                                      onClick={async () => {
                                        setId(item._id);
                                        await dispatch(deletePost(item._id));
                                        await dispatch(
                                          deletePostFromProfile(item._id)
                                        );
                                        setId("rtetrt");
                                      }}
                                      aria-disabled={dLoading}
                                    >
                                      <BiTrashAlt color="red" />
                                      {Id == item._id ? (
                                        <>
                                          <span className="loading loading-spinner loading-md"></span>
                                        </>
                                      ) : (
                                        "delete"
                                      )}
                                    </button>
                                  </>
                                )}
                                <Link to={`/blogs/${item._id}`}>
                                  <button className=" py-3 px-7 bg-black rounded btn-sm flex items-center text-white gap-2 uppercase btn-ghost transition-all duration-700">
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
                        <th>Title</th>

                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            ) : (
              <h2 className="py-20 px-10 text-7xl font-extrabold">
                There is no Posts
              </h2>
            )}
          </div>
          <ProfileImgModel />
          {profile.loading ? (
            ""
          ) : (
            <ProfileDescModel
              username={profile?.profile?.username}
              bio={profile?.profile?.bio}
              job={profile?.profile?.job}
            />
          )}
        </>
      )}
    </>
  );
};

export default Profile;
