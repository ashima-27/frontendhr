import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faTable } from "@fortawesome/free-solid-svg-icons";
import EmployeeForm from "../../Popups/AddEmployee/AddEmployee";
import EditEmployeeForm from "../../Popups/EditEmployee/EditEmployee";
import DefaultPopup from "../../Popups/DefaultPopup/DefaultPopup";
import DashboardMenu from "../../Menu/DashboardMenu/DashboardMenu";
import SideCard from "../../global/SideCard";
import SimpleCard from "../../global/SimpleCard";
import TableFormat from "../../global/Table";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { 
    clearBlogSliceStates,
    clearBlogSliceData,
     
   
    clearBlogUserData,
    clearBlogSliceMessages,
  
  getAllBlogs, 
  updateBlog,
  deleteBlog,
  createBlog,
  duplicateBlog,
  makeBlogActiveInactive
   } from "../../Redux/blog";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import { toast, ToastContainer } from "react-toastify";
import BlogCard from "../../global/BlogCard";
import CreateBlog from "../CreateBlog/CreateBlog";
import EditBlog from "../EditBlog/EditBlog";
import BlogTable from "../../global/BlogTable";
import notFound from "../../assets/images/notFound.png";
const BlogDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPerPageDrop, setIsPerPageDrop] = useState(false);
  const [perPageDropName, setPerPageDropName] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteB,setDeleteB]=useState(false);
  const[duplicate,setDuplicate]=useState(false)
  const {
    allBlogs,
    
    blogCount,
    isBlogSliceFetching,
  
  
    blogSliceSuccessMessage,
    blogSliceErrorMessage,
    employeeSliceErrorMessage,
    isemployeeSliceFetchingSmall ,
    isBlogSliceError,
  } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "card" ? "table" : "card"));
  };

  const handleEditForm = (blog) => {
    setSelectedEmployee(blog);
    setEditForm(true);
  };

  const handleStatusChange = (blog) => {
    console.log("emp",blog._id)
    setSelectedEmployee(blog);
    setStatus(true);
  };
  const handleDelete = (blog) => {
    console.log("emp",blog._id)
    setSelectedEmployee(blog);
    setDeleteB(true)
  };

  const handleDuplicate = (blog) => {
    console.log("emp",blog,blog._id)
    setSelectedEmployee(blog);
setDuplicate(true)
  };

  const updateStatus=(emp)=>{
    let obj={
      id:emp._id,
      status:(!emp.blog_isActive)
    }
    console.log("updtaingg..",obj)
     dispatch(makeBlogActiveInactive(obj))
    setStatus(false);
  }
  const deleteBlogg=(emp)=>{
    let obj={
      id:emp,
    
    }
    console.log("delete..",obj)
    dispatch(deleteBlog(obj))
    setDeleteB(false);
  }
  const duplicateBlogg=(emp)=>{
    console.log("selecetd ,",emp)
    let obj={
        blogId:emp,
      
    }
    console.log("dplicate..",obj)
     dispatch(duplicateBlog(obj))
    setDuplicate(false);
  }
  const updateBlogg=(emp)=>{
    console.log("selecetd ,",emp)
   
    console.log("dplicate..",)
     dispatch(updateBlog(emp))
    setDuplicate(false);
  }
  const searchHandler = (searchValue) => {
    const keywords = searchValue?.split(",")?.map((keyword) => keyword.trim());
    setSearchQuery(searchValue);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const onChangePerPage = (obj) => {
    console.log(obj,"object")
    setPerPageDropName(obj.id);
  };

  const loadMore = () => {
    dispatch(
      getAllBlogs({
        perPageCount: perPageDropName,
        pageNumber: currentPage + 1,
        searchValue: searchQuery,
      })

    );
    setCurrentPage(currentPage + 1);
  };

  const onClickAddEmployee=()=>{

  }

  useEffect(() => {
    let obj = {
      searchValue: searchQuery,
      perPageCount: perPageDropName,
      pageNumber: currentPage,
    };
    console.log("obj", obj);
    dispatch(getAllBlogs(obj));
    return () => {
      dispatch(clearBlogSliceData());
    };
  }, [searchQuery, perPageDropName]);

  
  const successToast = () => {
    toast.success(blogSliceSuccessMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000, 
      hideProgressBar: false, 
      pauseOnHover: true, 
    });
  };

  const errorToast = () => {
    toast.error(blogSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false, 
      pauseOnHover: true, 
    });
  };



  useEffect(() => {
    if (isBlogSliceError) {
      toast.error(blogSliceErrorMessage, {
        // position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000, 
        hideProgressBar: false, 
        pauseOnHover: true, 
      });
    }
    return()=>{
      // dispatch(clearBlogSliceStates())
    }
  }, [isBlogSliceError]);

  console.log("allblogs",allBlogs)
  return (

    <div className="container m-auto py-5 h-auto">
    
      <ToastContainer />
    {isBlogSliceFetching && <ComponentLoader />}
      {showForm && <CreateBlog onCancel={() => setShowForm(false)} />}
      {status && (
        <DefaultPopup
          onYes={()=>updateStatus(selectedEmployee)}
          onCancel={() => setStatus(false)}
          desc={"Do You want to change the status Of Blog ?"}
          title={"Change Status"}
        />
      )}
        {deleteB && (
        <DefaultPopup
          onYes={()=>deleteBlogg(selectedEmployee._id)}
          onCancel={() => setDeleteB(false)}
          desc={"Do You want to delete the Blog ?"}
          title={"Delete Blog"}
        />
      )}
        {duplicate && (
        <DefaultPopup
          onYes={()=>duplicateBlogg(selectedEmployee._id)}
          onCancel={() => setDuplicate(false)}
          desc={"Do You want to duplicate the Blog ?"}
          title={"Duplicate Blog"}
        />
      )}
      {editForm && (
        <EditBlog
          onSubmit={updateBlogg}
          blogDetail={selectedEmployee}
          onCancel={() => setEditForm(false)}
        />
      )}
   
      <DashboardMenu
        employee={allBlogs}
        searchFunction={searchHandler}
        clearSearch={clearSearch}
        buttonName={"Create Blog"}
        onClickAddEmployee={() => navigate('/admin/createBlog')}
        onClickDownloadEmployee={() => console.log("download")}
        buttonName1={"Download"}
        buttonName2={
          <FontAwesomeIcon
            size="2xl"
            icon={viewMode === "card" ? faTable : faTh}
            className="mr-1"
          />
        }
        onClickToggle={toggleViewMode}
        options={[
          { name: "10", id: 10 },
          { name: "20", id: 20 },
          { name: "30", id: 30 },
          { name: "Max", id: blogCount },
        ]}
        isActive={isPerPageDrop}
        setIsActive={setIsPerPageDrop}
        onSelect={onChangePerPage}
        dropName={perPageDropName}
        isCsv={false}
       
      />
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4"><BlogCard/>
          {allBlogs?.map((blog, index) => (
            <BlogCard
              key={index}
              blog={blog}
              onClickEditForm={() => handleEditForm(blog)}
              onClickStatus={() => handleStatusChange(blog)}
               onClickDelete={()=>handleDelete(blog)}
               onClickDuplicate={()=>handleDuplicate(blog)}

            />
          ))}
          {allBlogs.length === 0 && (
            
              <div className="flex flex-col w-full gap-2 justify-center items-center min-h-screen ">
          <img src={notFound} alt="notFound" className="w-50 h-auto"/>
          <p className='text-md m-0 p-0 font-semibold'>Data Not Found !</p>
          </div>
            
          )}
        </div>
      ) : (
        <div className="">
         
              {allBlogs?.map((blog, index) => (
                <BlogTable
                key={index}
              blog={blog}
              onClickEditForm={() => handleEditForm(blog)}
              onClickStatus={() => handleStatusChange(blog)}
               onClickDelete={()=>handleDelete(blog)}
               onClickDuplicate={()=>handleDuplicate(blog)}
                />
              ))}
          {allBlogs.length === 0 && (
         
              <div className="flex flex-col w-full gap-2 justify-center items-center min-h-screen ">
          <img src={notFound} alt="notFound" className="w-50 h-auto"/>
          <p className='text-md m-0 p-0 font-semibold'>Data Not Found !</p>
          </div>
            
          )}
        </div>
      )}
      {allBlogs?.length !== blogCount && !isBlogSliceFetching && (
      <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block  bg-blue-500 text-white dark:text-white-400 hover:bg-blue-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            onClick={()=>loadMore()}
          >Load More</button>
          )}
    </div>
      
  );
};

export default BlogDashboard;
