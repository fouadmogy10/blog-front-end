import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import pepole from "../../assets/people.png";
import { useDispatch, useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/features/auth/authSlice";

const Navbar = ({ toggle, click }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const Navigate=useNavigate();
  const dispatch =useDispatch(); 
  const [loading, setloading] = useState(false);
  return (
    <nav className="flex items-center justify-between ">
      <AiOutlineMenu
        color={"#3c91e6"}
        min={25}
        cursor={"pointer"}
        onClick={() => click(toggle)}
      />
    
   
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="switch-mode"
        hidden
        onChange={(e) => {
          if (e.target.checked == true) {
            document.body.classList.add("dark");
            localStorage.setItem("mode", "black");
          } else {
            document.body.classList.remove("dark");
            localStorage.setItem("mode", "light");
          }
          
        }}
        defaultChecked={localStorage.getItem("mode") == "black" ? true : false}
      />
    <label htmlFor="switch-mode" className="switch-mode"></label>
     
    <div className="flex-none gap-2 px-5">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full flex items-center justify-center">
                <img src={userInfo?.profilePhoto?.url } />
              
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
               

               
              
                <li
                  onClick={async () => {
                    setloading(true);
                    await new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                      }, 2000);
                    });
                    await dispatch(logout());
                    Navigate("/"); 
                    window.location.reload();
                    setloading(false);
                  }}
                >
                  <button aria-disabled={loading} className="text-center">
                    {" "}
                    {loading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </li>
          </ul>
        </div>
    </div>
    </div>
    </nav>
  );
};

export default Navbar;
