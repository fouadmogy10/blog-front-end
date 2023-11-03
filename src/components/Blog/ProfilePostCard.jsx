import React from "react";
import { Link } from "react-router-dom";

const ProfilePostCard = ({post,username}) => {
  return (
    <div className="max-w-screen-xl mx-auto ">
      <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">
        <Link aria-label="blog"  to="/">
          <div className=" h-[300px]">
          <img
            className="w-full object-contain max-h-[300px] "
            src={post?.image?.url}
            alt="Sunset in the mountains"
          />

          </div>
        </Link>
        <div className="relative md:-mt-16 px-10 pt-5 pb-16 bg-primary md:m-10 shadow-[0_0px_30px_rgba(8,_112,_184,_0.7)]">
          <h2
            className="font-semibold text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          >
            {post?.title}
          </h2>
          <p className=" text-sm line-clamp-2">
            {post?.description}
          </p>
          <p className="mt-5  text-xs">
            By: 
            <a
              href="#"
              className="text-xs transition duration-500 ease-in-out"
            >
             {" "} { username}
            </a>

          
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
