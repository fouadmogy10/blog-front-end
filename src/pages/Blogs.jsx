import React, { useEffect, useState } from "react";
import CommonSection from "../components/commonSection/CommonSection";
import BlogCard from "../components/Blog/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../components/Blog/BlogList";
import { getAllPost, reset } from "../app/features/blogs/blogSlice";
import Meta from "../components/Meta";
import BlogCardLoader from "../components/Skeleton/BlogCardLoader";
import Lottie from "../components/Lottie";

const Blogs = () => {
  const { loading, blogs, success } = useSelector(({ blog }) => blog);
  const { categories } = useSelector(({ category }) => category);
  const [cat, setCat] = useState("");
  const [Data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(reset());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setData(blogs);
  }, [blogs]);

  useEffect(() => {
    if (cat === "") {
      setData(blogs);
    } else {
      setData(blogs.filter((item) => item.category === cat));
    }
  }, [cat]);

  return (
    <div>
      <Meta title={"All Posts"} />
      <CommonSection Documents={"Blogs"} href={"/blogs"} />
      <div className="container">
        <div className="flex pt-10 pb-5 justify-between items-center flex-wrap gap-4">
          <h2 className="text-4xl capitalize  font-bold">Latest Posts</h2>

          <select
            className="select select-bordered w-full md:max-w-sm rounded-2xl"
            defaultValue={""}
            onChange={(e) => {
              setcat(e.target.value);
            }}
          >
            <option disabled>Category</option>
            <option value={""}>All</option>
            {categories?.map((item) => {
              return (
                <option key={item?._id} value={item?.title}>
                  {item?.title}
                </option>
              );
            })}
          </select>
        </div>
        {Data.length > 0 ? (
          <div className=" m-auto w-full grid   grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 py-5">
            {
              <BlogList
                category={cat}
                data={Data}
                loading={loading}
                success={success}
              />
            }
          </div>
        ) : (
          <div className="mx-auto">
            <Lottie url="https://lottie.host/2592b7e6-3ce8-4270-a822-cb43edfee586/BKyDNlCLqK.json" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
