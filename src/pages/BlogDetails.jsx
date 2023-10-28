import React, { useEffect } from "react";
import CommonSection from "../components/commonSection/CommonSection";
import Details from "../components/Blog/Details";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../app/features/blogs/blogSlice";
import { useParams } from "react-router-dom";
import Meta from "../components/Meta";

const BlogDetails = () => {
  const { loading, PostDetails } = useSelector((state) => state.blog);
  const {id}=useParams();
  const dispatch =useDispatch(); 
  useEffect(() => {
    dispatch(getPost(id))
    window.scrollTo(0,0)
  }, [id])
  
  return <>
  <Meta title={PostDetails?.title}/>
  <section className="min-h-screen">
    <CommonSection  Documents={"Blogs"} BlogTitle={`${PostDetails?.title}`} href={"/blogs"} />
    <div className="container">
    <Details loading={loading} post={PostDetails} id={id}/>
    </div>
  </section>
  </>;
};

export default BlogDetails;
