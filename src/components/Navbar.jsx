import { BiUser } from "react-icons/bi";
import ToggleSwitch from "./toggle/ToggleSwitch";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/auth/authSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { userInfo: user, userToken: token } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (window.localStorage.getItem("mode") == "black") {
      document.body.setAttribute("data-theme", "black");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <div className="navbar bg-primary ">
      <div className="navbar-start">
        <div className="dropdown mx-4">
          <label tabIndex={0} className=" lg:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/blogs"}>Blogs</NavLink>
            </li>
          </ul>
        </div>
        <Link
          aria-label="blog"
          to={"/"}
          className=" normal-case italic logo text-transparent"
        >
          <span className="text-3xl font-extrabold ">B</span>LOG
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 gap-5">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/blogs"}>Blogs</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-2 px-5">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full flex items-center justify-center">
                {token ? (
                  <img
                    src={
                      typeof(user?.profilePhoto) === "string"
                        ? user?.profilePhoto
                        : user?.profilePhoto?.url
                    }
                    alt=""
                  />
                ) : (
                  <BiUser size={25} className="m-auto mt-2" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              {token ? (
                <>
                  <li>
                    <Link
                      aria-label="blog"
                      to={`/profile/${user._id}`}
                      className="justify-between"
                    >
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>

                  {user?.isAdmin && (
                    <li>
                      <Link to={"/admin/"}>Admin Dashboard</Link>
                    </li>
                  )}

                  <li>
                    <Link aria-label="blog" to={"/post/create"}>
                      Create Post
                    </Link>
                  </li>
                  <li
                    onClick={async () => {
                      setloading(true);
                      await new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                        }, 2000);
                      });
                      dispatch(logout());
                      setloading(false);
                    }}
                  >
                    <Link
                      aria-label="blog"
                      aria-disabled={loading}
                      className="text-center"
                    >
                      {" "}
                      {loading ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        "Logout"
                      )}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      aria-label="blog"
                      to={"/login"}
                      className="justify-between"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      aria-label="blog"
                      to={"/register"}
                      className="justify-between"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <ToggleSwitch />
        </div>
      </div>
    </div>

    // <div className={`navbar bg-primary `}>
    //   <div className="flex-1 px-5">
    //     <Link aria-label="blog"  to={"/"} className=" normal-case italic logo text-transparent">
    //       <span className="text-3xl font-extrabold ">B</span>LOG
    //     </Link>
    //   </div>

    // </div>
  );
};

export default Navbar;
