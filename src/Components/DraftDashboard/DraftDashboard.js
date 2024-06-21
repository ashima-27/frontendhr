import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBlogSliceData,
  getDraftBlogById,
  updateBlog,
  deleteBlog,
} from "../../Redux/blog";
import moment from "moment";
import EditBlog from "../EditBlog/EditBlog";
import DropActions from "../../global/DropActions";
import DefaultPopup from "../../Popups/DefaultPopup/DefaultPopup";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
const BlogDraft = () => {
  const { blogDraft } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteB,setDeleteB]=useState(false);
  useEffect(() => {
    const obj = {
      searchValue: "",
      perPageCount: 10,
      pageNumber: 1,
    };
    dispatch(getDraftBlogById(obj));

    return () => {
      dispatch(clearBlogSliceData());
    };
  }, [dispatch]);

  const updateBlogg = (emp) => {
    dispatch(updateBlog(emp));
    setEditForm(false);
  };

  const openEditForm = (blog) => {
    setSelectedBlog(blog);
    setEditForm(true);
  };
  const handleDelete = (id) => {
    console.log("emp",id)
    setSelectedBlog(id);
    setDeleteB(true)
  };
  const deleteBlogg=(emp)=>{
    console.log('emp3',emp)
    let obj={
      id:emp,
    
    }
    console.log("delete..",obj)
    dispatch(deleteBlog(obj))
    // setDeleteB(false);
  }
  return (
    <div className="m-4 p-2">
      {editForm && (
        <EditBlog
          onSubmit={updateBlogg}
          blogDetail={selectedBlog}
          onCancel={() => setEditForm(false)}
        />
      )}
      {deleteB && (
        <DefaultPopup
          onYes={()=>deleteBlogg(selectedBlog)}
          onCancel={() => setDeleteB(false)}
          desc={"Do You want to delete the Blog ?"}
          title={"Delete Blog"}
        />
      )}
      <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg overflow-scroll hide-scrollbar">
     
        {Array.isArray(blogDraft) && blogDraft.length > 0 ? (
          <div className="">
          <table className="table-auto border-collapse border border-slate-500 mt-5 w-full">
        <thead>
          <tr>
            <th className="border   px-4 py-2">Title</th>
            <th className="border   px-4 py-2">Description</th>
            <th className="border   px-4 py-2">Created On</th> 
            <th className="border   px-4 py-2">Actions</th>
          </tr>
        </thead>
              <tbody className="">
                {blogDraft.map((blog, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 !== 0 ? "#ffffff" : "#eff2f9" }}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900"   onClick={() => {
                        console.log("dataa",blog)
                        navigate(`/admin/createBlog`,{state:{draftData :blog}});
                      }}>{blog.blog_Title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{blog.blog_description?.split(" ")?.slice(0, 6)?.join(" ")}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{moment(blog.blog_CreatedOn).format("MMM Do YYYY")}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleDelete(blog._id)}
                        >
                         Delete
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No drafts available</p>
        )}
      </div>
    </div>
  );
};

export default BlogDraft;
