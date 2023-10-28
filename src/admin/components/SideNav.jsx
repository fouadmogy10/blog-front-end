import { AiOutlineComment } from "react-icons/ai"; 
import { BiCategory } from "react-icons/bi";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/features/auth/authSlice";

const SideNav = () => {

  return (
    <section id="sidebar" className={localStorage.getItem("collapse")}>
      <NavLink to="/admin/" className="brand">
        <AiOutlineSmile />
        <span className="text">Admin</span>
      </NavLink>
      <ul className="side-menu top">
    
        <li>
          <NavLink to="/admin/">
            <FaUsers />
            <span className="text">Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/addCategory">
            <BiCategory /> <span className="text">Add Category</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/All-posts">
            <BsFileEarmarkPost />
            <span className="text">Posts</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/AllCategory">
            <BiCategory />
            <span className="text">Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/AllComment">
            <AiOutlineComment />
            <span className="text">All Comment</span>
          </NavLink>
        </li>
      </ul>

    </section>
  );
};

export default SideNav;
