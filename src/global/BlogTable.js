import React ,{useState,useEffect }from "react";
import moment from "moment";
import { CSVLink } from "react-csv";
import DropActions from "./DropActions";
import { NavLink } from "react-router-dom";
import user from "../assets/images/user.png";
import Cookies from "js-cookie";
import noImage from "../../src/assets/images/noImage.jpg"
const BlogTable = ({ blog, key ,onClickEditForm, onClickStatus, onClickDelete, onClickDuplicate }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const roles = Cookies.get("role");
    if (roles) {
     
      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("admin"));
    }
  }, [Cookies.get("role")]);


  const getStatusClass = (isActive) => (isActive ? "bg-green-300" : "bg-red-300");
  const statusClass = blog?.blog_isActive ? "bg-green-300" : "bg-red-300";

  return (
    blog && (
        <div className="w-full flex ">
        <div className="w-full flex p-4 bg-white m-4 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="flex-grow ">
          {isAdmin && (
            <div className="flex justify-between items-center mt-2">
              <div className={`flex justify-start ${statusClass} text-white px-2 py-1 rounded`}>
                {blog?.blog_isActive ? "Active" : "Inactive"}
              </div>
              <div className="flex justify-end px-2 py-1">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <DropActions
                    heading={
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                    }
                    options={[
                      { name: "Edit", onClick: onClickEditForm },
                      { name: "Status", onClick: onClickStatus },
                      { name: "Duplicate", onClick: onClickDuplicate },
                      { name: "Delete", onClick: onClickDelete },
                    ]}
                  />
                </button>
              </div>
            </div>
            )}
            <div className="flex justify-between items-center">
            <NavLink to={`/blog?id=${blog?._id}`}>     <h1 className="text-xl text-left capitalize font-semibold py-3">{blog?.blog_Title}</h1></NavLink>
            </div>
            <p className="text-gray-600 mb-2 text-left capitalize text-md">{blog?.blog_description}</p>
            <div className="flex flex-row justify-between">
              <div className="text-sm text-gray-500 flex justify-start">
                {blog?.blog_readingTime} min read
              </div>
              <div className="text-sm text-gray-500 flex justify-end">
                {blog?.blog_Type}
              </div>
            </div>
            <div className="flex flex-row flex-wrap">
              {blog?.tags.map((tag, index) => (
                <div key={index} className="text-gray-600 mb-2 text-xs p-1 px-2 m-2 rounded" style={{ backgroundColor: "#eff2f9" }}>
                  #{tag}
                </div>
              ))}
            </div>
            <div className="flex items-center mt-3 p-2" >
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full shadow-lg"
                  src={blog?.user[0]?.image || user}
                />
              </div>
              <div className="ml-4 items-center">
                <div className="text-sm font-medium text-gray-900">
                <NavLink to={`/admin/empdetails?id=${blog?.user[0]?._id}`}>{blog?.user[0]?.name}</NavLink>
                </div>
                <div className="text-sm text-gray-500">{blog?.user[0]?.email}</div>
                <div className="text-sm text-gray-500">{moment(blog?.blog_CreatedOn).format("MMM Do YYYY")}</div>
              </div>
            </div>
          </div>

          <div className={`w-1/3 p-2 invisible lg:visible`}>
            <img className="w-full h-full object-cover" src={blog?.image || noImage} alt={blog?.blog_Title} />
          </div>
        </div>
        </div>
      )
      
   
  );
};

export default BlogTable;
