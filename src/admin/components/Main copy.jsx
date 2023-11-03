import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineCloudDownload } from "react-icons/ai";
import pepole from "../../assets/people.png"
import React from "react";
import { Link } from "react-router-dom";

const Main = ({title,breadcrumb}) => {
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
              <Link aria-label="blog"  className="active" to="!#">
                {breadcrumb}
              </Link>
            </li>
          </ul>
        </div>
        <Link aria-label="blog"  to="!#" className="btn-download">
          <AiOutlineCloudDownload />
          <span className="text">Download PDF</span>
        </Link>
      </div>

      <ul className="box-info">
        <li>
          <AiOutlineCalendar />
          <span className="text">
            <h3>1020</h3>
            <p>New Order</p>
          </span>
        </li>
        <li>
          <BiGroup />
          <span className="text">
            <h3>2834</h3>
            <p>Visitors</p>
          </span>
        </li>
        <li>
          <AiOutlineDollarCircle />
          <span className="text">
            <h3>$2543</h3>
            <p>Total Sales</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recent Orders</h3>
            <AiOutlineSearch />
            <AiOutlineFilter />
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={pepole} />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={pepole} />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={pepole} />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td>
                  <span className="status process">Process</span>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={pepole} />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={pepole} />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="todo">
          <div className="head">
            <h3>Todos</h3>
            <i className="bx bx-plus"></i>
            <AiOutlinePlusCircle />
            <AiOutlineFilter />
          </div>
          <ul className="todo-list">
            <li className="completed">
              <p>Todo List</p>
              <HiOutlineDotsVertical />
            </li>
            <li className="completed">
              <p>Todo List</p>
              <HiOutlineDotsVertical />
            </li>
            <li className="not-completed">
              <p>Todo List</p>
              <HiOutlineDotsVertical />
            </li>
            <li className="completed">
              <p>Todo List</p>
              <HiOutlineDotsVertical />
            </li>
            <li className="not-completed">
              <p>Todo List</p>
              <HiOutlineDotsVertical />
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Main;
