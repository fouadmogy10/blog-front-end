import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ data, loading, success }) => {
  if (success == false) {
    return <div className="w-full py-5">Some Thing Went Wrong</div>;
  }
  return (
    <>
      { data?.map((item, idx) => {
       return <BlogCard key={idx} details={item} loading={loading} />;
      })}
    </>
  );
};

export default BlogList;
