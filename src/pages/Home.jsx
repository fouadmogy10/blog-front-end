import React, { useEffect } from "react";

import Header from "../components/header/Header";
import BlogList from "../components/Blog/BlogList";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, reset } from "../app/features/blogs/blogSlice";
import Blogs from "./Blogs";
import Meta from "../components/Meta";
import BlogCardLoader from "../components/Skeleton/BlogCardLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, blogs, success } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getAllPost());
    dispatch(reset());
    document.querySelector("body").scrollTo(0, 0);
  }, []);
  return (
    <>
      <Meta title={"Home"} />
      <section>
        <Header />
        <div className="container">
          <Title />
          <div className=" m-auto w-full grid   grid-cols-1 sm:grid-cols-2   gap-4 py-5">
            {loading ? (
              <>
                <BlogCardLoader />
                <BlogCardLoader />
                <BlogCardLoader />
                <BlogCardLoader />
              </>
            ) : (
              <BlogList
                success={success}
                data={
                  blogs?.slice(0, 4)

                }
                loading={loading}
                category={""}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
