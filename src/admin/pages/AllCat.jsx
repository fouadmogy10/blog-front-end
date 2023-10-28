import { AiFillEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Start from "../components/Start";
import Main from "../components/Main";
import Top from "../components/Top";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../../app/features/category/categoryServices";
import { deleteCat } from "../../app/features/category/categorySlice";
import Swal from "sweetalert2";

const AllCategories = () => {
  let i = 1;
  const { categories } = useSelector((state) => state.category);
  const [Id, setId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const deleteCatHandler = async (userId) => {
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
        await dispatch(deleteCategory(userId));
        await dispatch(deleteCat(userId));
        setId("rtetrt");
        await Swal.fire("Deleted!", "Your Post has been deleted.", "success");
      }
    });
  };

  return (
    <Start>
      <Main title={"Dashboard"} breadcrumb={"All Categories"}>
        <div className="table-data">
          <div className="order text-center">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-gray-500">
                    <th>#</th>
                    <th>category Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {categories.length > 0 ? (
                    categories.map((item) => (
                      <tr key={item?._id}>
                        <th>
                          <label>{i++}</label>
                        </th>

                        <td>{item.title}</td>
                        <th>
                          <div className="flex gap-2">
                            <button
                              className="flex btn btn-ghost btn-sm"
                              onClick={async () => deleteCatHandler(item?._id)}
                            >
                              <BiTrashAlt color="red" />{" "}
                              {Id == item?._id ? (
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
                      <td>there is no category</td>
                    </tr>
                  )}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr className="text-gray-500">
                    <th>#</th>
                    <th>category Title</th>
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

export default AllCategories;
