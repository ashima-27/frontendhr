import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import { getBlogById } from "../../Redux/blog";
import { NavLink, useSearchParams } from "react-router-dom";
import user from "../../assets/images/user.png";
const BlogDetail = ({ image, title, tags, body }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log("Serc", id);
  const { blogDetail, isBlogSliceFetching } = useSelector(
    (state) => state.blog
  );
console.log("cd",blogDetail.user && blogDetail?.user[0]?.name)
  useEffect(() => {
    if (id) {
      dispatch(getBlogById({ id }));
    }
    return () => {
      //   dispatch(())
    };
  }, [id, dispatch]);

  return (
    <>
      <ToastContainer />
      {isBlogSliceFetching && <ComponentLoader />}
   {blogDetail && (  
     <div className="p-3 flex justify-center items-start space-y-8">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-7xl space-y-4">
         
      <div className="max-w-4xl mx-auto p-2">
        <img
          src={blogDetail?.image}
          alt={blogDetail?.blog_Title}
          className="w-full h-56 object-cover rounded-md shadow-md mb-6"
        />
        <div
          className="flex items-center mt-3 justify-center"
     
        >
          <div className="flex flex-col md:flex-row justify-between w-full">
  <div className="flex items-center mb-4 md:mb-0">
    <div className="flex-shrink-0 sm:px-3">
      <img
        className="w-12 h-12 rounded-full shadow-lg"
        src={blogDetail.user && blogDetail?.user[0]?.image || user}
        alt={blogDetail.user && blogDetail?.user[0]?.name ? blogDetail?.user[0]?.name : 'Xyz'}
      />
    </div>
    <div className="ml-4 sm:px-3">
      <div className="text-sm font-medium text-gray-900">
        <NavLink to={`/blog?id=${blogDetail.user && blogDetail?.user[0]?._id}`}>
          {blogDetail.user && blogDetail?.user[0]?.name ? blogDetail?.user[0]?.name : "xyz"}
        </NavLink>
      </div>
      <div className="text-sm text-gray-500">
        {blogDetail.user && blogDetail?.user[0]?.email}
      </div>
    </div>
  </div>

  <div className="flex flex-col items-end text-right">
    <div className="text-sm">
      Published On{" "}
      <b>
        {moment(blogDetail?.blog_CreatedOn).format("MMM Do YYYY")}
      </b>
    </div>
    <div className="text-sm">
      <b>{blogDetail?.blog_readingTime} minute(s) read</b>{" "}
      {blogDetail?.blog_wordCount} word count
    </div>
  </div>
</div>

        </div>
        <div className="flex-grow mx-4 my-2 border-t border-gray-400"></div>
        <h1 className=" text-xl lg:text-3xl font-bold text-left mb-2">
          {blogDetail?.blog_Title}
        </h1>
        <p className="text-gray-600 mb-2 text-left font-semibold capitalize text-md lg:text-xl">
          {blogDetail?.blog_description}
        </p>

        <div className="flex flex-wrap mb-6">
          {blogDetail?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-black-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
             # {tag}
            </span>
          ))}
        </div>
        <div className="flex-grow mx-4 my-2 border-t border-gray-400"></div>
        <div className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: blogDetail?.blog_Body,
            }}
          ></div>
        </div>
      </div>
      </div>
      </div>)}
    </>
  );
};

export default BlogDetail;
