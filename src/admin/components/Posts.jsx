import React from "react";
import Start from "../components/Start";
import Main from "../components/Main";
import Top from "../components/Top";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

const Posts = () => {
  return (
    <Start>
      <Main title={"Dashboard"} breadcrumb={"All Posts"}>
        <Top />
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
                  <tr>
                    <th>
                      <label>1</label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3 flex-wrap justify-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>Hart Hagerty</td>
                    <td>fouad@gmail.com</td>
                    <th>
                      <div className="flex gap-2">
                        <button className="flex btn btn-ghost btn-sm">
                          <BiTrashAlt color="red" /> delete
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          <AiOutlineEye color="#3c91e6" />
                          View
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <label>1</label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3 flex-wrap justify-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>Hart Hagerty</td>
                    <td>fouad@gmail.com</td>
                    <th>
                      <div className="flex gap-2">
                        <button className="flex btn btn-ghost btn-sm">
                          <BiTrashAlt color="red" /> delete
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          <AiOutlineEye color="#3c91e6" />
                          View
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <label>1</label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3 flex-wrap justify-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>Hart Hagerty</td>
                    <td>fouad@gmail.com</td>
                    <th>
                      <div className="flex gap-2">
                        <button className="flex btn btn-ghost btn-sm">
                          <BiTrashAlt color="red" /> delete
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          <AiOutlineEye color="#3c91e6" />
                          View
                        </button>
                      </div>
                    </th>
                  </tr>
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
