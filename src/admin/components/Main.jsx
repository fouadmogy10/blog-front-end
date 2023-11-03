import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineCloudDownload } from "react-icons/ai";
import pepole from "../../assets/people.png";
import React from "react";
import { Link } from "react-router-dom";

const Main = ({ title, breadcrumb, children, secondTitle }) => {
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>{title}</h1>
          <ul className="breadcrumb">
            <li>
              <Link aria-label="blog"  to="/">Dashboard</Link>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <Link aria-label="blog"  className="active" >
                {breadcrumb}
              </Link>
            </li>
          </ul>
        </div>
        
      </div>

      
          <div className="head">
            <h3>{secondTitle}</h3>
          </div>
          <div>
            <div>{children}</div>
          </div>
       
    </main>
  );
};

export default Main;
