import { BsFilePost } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

const Top = () => {
  const { users } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const { comments } = useSelector((state) => state.comment);
  const { blogs } = useSelector((state) => state.blog);

  return (
    <div className="table-data">
      <div className="order">
        <ul className="box-info ">
          <li>
            <FiUsers />
            <span className="text">
              <h3>
                <CountUp duration={5} delay={1} start={0} end={users?.length} />
              </h3>
              <p>Users</p>
              <Link className="text-[#3c91e6]" to={"/admin/"}>
                See All Users
              </Link>
            </span>
          </li>
          <li>
            <BiCategoryAlt />
            <span className="text">
              <h3>
                <CountUp duration={5} delay={1} start={0} end={categories?.length} />
              </h3>
              <p>Categories</p>
              <Link className="text-[#3c91e6]" to={"/admin/AllCategory"}>
                See All Categories
              </Link>
            </span>
          </li>
          <li>
            <AiOutlineComment />
            <span className="text">
              <h3>
                <CountUp duration={5} delay={1} start={0} end={comments?.length} />
              </h3>
              <p>Comment</p>
              <Link className="text-[#3c91e6]" to={"/admin/AllComment"}>
                See All Comment
              </Link>
            </span>
          </li>
          <li>
            <BsFilePost />
            <span className="text">
              <h3>
                <CountUp duration={5} delay={1} start={0} end={blogs?.length} />
              </h3>
              <p>Posts</p>
              <Link className="text-[#3c91e6]" to={"/admin/All-posts"}>
                See All Posts
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
