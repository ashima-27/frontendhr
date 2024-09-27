import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  getAlltemplate,
  deletetemplate,
  updatetemplate,
  updatetemplateStatus,
  cleartemplateSliceStates,
  cleartemplatesliceData,
  template,
} from "../../Redux/template"; // Adjust the import based on your file structure
import DropActions from "../../global/DropActions";
import { isPending } from "@reduxjs/toolkit";
import Menu from "../../Menu/NotificationMenu/NotificationMenu";
import Pagination from "../../global/Pagination";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import { toast, ToastContainer } from "react-toastify";
import TemplatePreview from "../../Popups/TemplatePreview/TemplatePreview";
import EditTemplate from "../../Popups/EditTemplate/EditTemplate";
import notFound from "../../assets/images/notFound.png";
const TemplateDashboard = () => {
  const dispatch = useDispatch();
  const roles = Cookies.get("role");
  const [filterType, setFilterType] = useState("all");
  const {
    alltemplate,
    status,
    error,
    totaltemplate,
    istemplateSliceFetching,
    istemplateSliceSuccess,
    istemplateSliceError,
    templateSliceSuccessMessage,
    templateSliceErrorMessage,
  } = useSelector((state) => state.template);

  const [data, setData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPerPageDrop, setIsPerPageDrop] = useState(false);
  const [perPageDropName, setPerPageDropName] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tempPreview, setTemplatePreview] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const [editedtemplate, setEditedtemplate] = useState({
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    emergencyDetails: "",
  });

  useEffect(() => {
    let obj = {
      searchValue: searchQuery,
      perPageCount: perPageDropName,
      pageNumber: currentPage,
      fromDate: startDate,
      toDate: endDate,
    };

    dispatch(getAlltemplate(obj));

    return () => {
      dispatch(cleartemplatesliceData());
    };
  }, [searchQuery, perPageDropName, currentPage, startDate, endDate]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const successToast = () => {
    toast.success(templateSliceSuccessMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const errorToast = () => {
    toast.error(templateSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  useEffect(() => {
    if (istemplateSliceSuccess) {
      successToast();
      setEditModel(false);
    }
    return () => {
      dispatch(cleartemplateSliceStates());
    };
  }, [istemplateSliceSuccess]);

  useEffect(() => {
    if (istemplateSliceError) {
      errorToast();
    }
    return () => {
      dispatch(cleartemplateSliceStates());
    };
  }, [istemplateSliceError]);

  const handleDelete = (id) => {
    console.log("id", id);
    dispatch(deletetemplate({ id: id }));
  };

  const handleEdit = (template) => {
    console.log("id", template);
    setData(template);
    setEditModel(true);
  };

  const handlePreview = (template) => {
    console.log("id", template);
    setData(template);
    setTemplatePreview(true);
  };

  const handleStatus = (id, status) => {
    console.log("id", id, status);
    let obj = {
      id: id,
      status: status,
    };
    dispatch(updatetemplateStatus(obj));
  };

  const searchHandler = (searchValue) => {
    const keywords = searchValue?.split(",").map((keyword) => keyword.trim());
    setSearchQuery(searchValue);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const onChangePerPage = (obj) => {
    console.log(obj, "object");
    setPerPageDropName(obj.id);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(totaltemplate / perPageDropName));
  }, [totaltemplate, perPageDropName]);

  const onEdit = (template) => {
    console.log("alll", template);
    dispatch(updatetemplate(template));
  };
  const statusClass = template.status ? "bg-green-300" : "bg-red-300";
  const getStatusStyle = (status) => {
    switch (status) {
      case false:
        return { backgroundColor: "#fff8dc", color: "#8b8000" }; // Light yellow background, dark yellow text
    case true:
        return { backgroundColor: "#e6ffe6", color: "#008000" }; // Light green background, green text
      default:
        return { backgroundColor: "#fff8dc", color: "#8b8000" }; // Default white background, black text
    }
  };
  return (
    <>
      {tempPreview && (
        <TemplatePreview
          template={data}
          onClose={() => setTemplatePreview(false)}
        />
      )}
      {editModel && (
        <EditTemplate
          template={data}
          onClose={() => setEditModel(false)}
          onEdit={onEdit}
        />
      )}
      <div className="px-4 py-1 ">
      <ToastContainer />
      {istemplateSliceFetching && <ComponentLoader />}
      <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg">
        <Menu
          options={[
            { name: "10", id: 10 },
            { name: "20", id: 20 },
            { name: "30", id: 30 },
            { name: "Max", id: totaltemplate },
          ]}
          searchFunction={searchHandler}
          clearSearch={clearSearch}
          isActive={isPerPageDrop}
          setIsActive={setIsPerPageDrop}
          onSelect={onChangePerPage}
          dropName={perPageDropName}
          startDate={startDate}
          showing={alltemplate.length}
          total={totaltemplate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isCreate={true}
          isCreateLink={"/admin/emailform"}
          isCreateName={"Create Template"}
        />
      </div>
      <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg overflow-scroll hide-scrollbar min-h-96 ">
        <table className="table-auto border-collapse border border-slate-500 mt-5 w-full">
          <thead>
            <tr>
              <th className="   p-2">Title</th>
              <th className="   p-2">Status</th>
              <th className="   p-2">Created On</th>
              <th className="   p-2">created By</th>
              <th className="   p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {alltemplate.map((template,index) => (
              <tr key={template.id} style={{ backgroundColor: index % 2 !== 0 ? "#ffffff" : "#eff2f9" }}>
                <>
                  <td className="  capitalize  p-2">
                    {template.title}
                  </td>
                  <td className="  capitalize  p-2">
                  <span style={getStatusStyle(template.status)} className="p-2" >
                      {" "}
                      {template.status ? "Active" : "InActive"}
                    </span>
                  </td>

                  <td className="   p-2">
                    {new Date(template.createdAt).toLocaleDateString()}
                  </td>

                  <td className="   p-2">
                    <div className="text-sm font-medium text-gray-900">
                      {template?.createdBy?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {" "}
                      {template?.employeeEmail}
                    </div>
                  </td>

                  <td className="border   px-4 py-2">
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
                        { name: "Edit", onClick: () => handleEdit(template) },
                        {
                          name: "Delete",
                          onClick: () => handleDelete(template._id),
                        },
                        {
                          name: "Preview",
                          onClick: () => handlePreview(template),
                        },
                        {
                          name: "Change Status",
                          onClick: () =>
                            handleStatus(template._id, template.status),
                        },
                      ]}
                    />
                  </td>
                </>
              </tr>
            ))}
          
          </tbody>
        
        </table>
        {alltemplate.length === 0 && (
              <div className="flex flex-col w-full gap-2 justify-center items-center min-h-screen ">
          <img src={notFound} alt="notFound" className="w-50 h-auto"/>
          <p className='text-md m-0 p-0 font-semibold'>Data Not Found !</p>
          </div>
            )}
      </div>
      <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg flex  justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      </div>
    </>
  );
};

export default TemplateDashboard;
