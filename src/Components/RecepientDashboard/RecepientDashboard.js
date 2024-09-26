import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  getAllRecepient,
  deletetemplate,
  updatetemplate,
  updatetemplateStatus,
  cleartemplateSliceStates,
  cleartemplatesliceData,
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
import {NavLink} from 'react-router-dom';
import notFound from "../../assets/images/notFound.png"
const RecepientDashboard = () => {
  const dispatch = useDispatch();
  const roles = Cookies.get("role");
  const [filterType, setFilterType] = useState("all");
  const {
    totalRecepient,
    istemplateSliceFetching,
    istemplateSliceSuccess,
    istemplateSliceError,
    templateSliceSuccessMessage,
    templateSliceErrorMessage,
    allRecepient,
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

    dispatch(getAllRecepient(obj));

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

  const handleEdit = (Recepient) => {
    console.log("id", Recepient);
    setData(Recepient);
    setEditModel(true);
  };

  const handlePreview = (Recepient) => {
    console.log("id", Recepient);
    setData(Recepient);
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
    setTotalPages(Math.ceil(totalRecepient / perPageDropName));
  }, [totalRecepient, perPageDropName]);

  const onEdit = (Recepient) => {
    console.log("alll", Recepient);
    dispatch(updatetemplate(Recepient));
  };
  const getStatusStyle = (status) => {
    console.log("status",status)
    switch (status) {
      case "Pending":
        return { backgroundColor: "#fff8dc", color: "#8b8000" }; // Light yellow background, dark yellow text
      case "Failed":
        return { backgroundColor: "#ffe4e1", color: "#ff0000" }; // Light red background, red text
      case "Sent":
        return { backgroundColor: "#e6ffe6", color: "#008000" }; // Light green background, green text
    default:
     return { backgroundColor: "#fff8dc", color: "#8b8000" }; // Default white background, black text
     }
  };

  return (
    <>
    <div className="px-4 py-1  ">
      {tempPreview && (
        <TemplatePreview
          Recepient={data}
          onClose={() => setTemplatePreview(false)}
        />
      )}
      {editModel && (
        <EditTemplate
          Recepient={data}
          onClose={() => setEditModel(false)}
          onEdit={onEdit}
        />
      )}
      <ToastContainer />
      {istemplateSliceFetching && <ComponentLoader />}
      <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg">
        <Menu
          options={[
            { name: "10", id: 10 },
            { name: "20", id: 20 },
            { name: "30", id: 30 },
            { name: "Max", id: totalRecepient },
          ]}
          searchFunction={searchHandler}
          clearSearch={clearSearch}
          isActive={isPerPageDrop}
          setIsActive={setIsPerPageDrop}
          onSelect={onChangePerPage}
          dropName={perPageDropName}
          startDate={startDate}
          showing={allRecepient.length}
          total={totalRecepient}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isCreate={true}
          isCreateLink={"/admin/sendEmail"}
          isCreateName={"Send Mail"}
        />
      </div>
      <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg overflow-scroll hide-scrollbar ">
        <table className="table-auto border-collapse border border-slate-500 mt-5 w-full ">
          <thead>
            <tr>
              <th className="    p-2">Template Name</th>
              <th className="    p-2">Status</th>
              <th className="    p-2">Sended To</th>
              <th className="    p-2">Sended By</th>
              <th className="    p-2">Sended On</th>
            </tr>
          </thead>
          <tbody>
            {allRecepient?.map((Recepient,index) => (
              <tr key={Recepient?.id} style={{ backgroundColor: index % 2 !== 0 ? "#ffffff" : "#eff2f9" }}>
                <>
                  <td className="    p-2">
                    {Recepient?.templateName}
                  </td>
                  <td className="p-2">
                    
                      <span style={getStatusStyle(Recepient?.status)} className="p-2">
                    
                      {Recepient?.status}
                    </span>
                  </td>
                  <td className="    p-2">
                    
                    <div className="text-sm font-medium text-gray-900">
              <NavLink to={`/admin/empdetails?id=${Recepient.employeeId}`}> {Recepient?.employeeName}</NavLink>
              </div>
              <div className="text-sm text-gray-500"> {Recepient?.employeeEmail}</div>
          
                  </td>
                  <td className="    p-2">
                  <div className="text-sm font-medium text-gray-900">
              <NavLink to={`/admin/empdetails?id=${Recepient.senderId}`}> {Recepient?.senderName}</NavLink>
              </div>
              <div className="text-sm text-gray-500"> {Recepient?.senderEmail}</div>

                   
                  </td>
                  <td className="    p-2">
                    {new Date(Recepient?.createdAt).toLocaleDateString()}
                  </td>

                

                  {/* <td className="border   px-4 py-2">
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
                              { name: "Edit",  
                               onClick: () => handleEdit(Recepient),
                               
                                },
                              {
                                name: "Delete",
                                onClick: () => handleDelete(Recepient._id),
                              },
                              {
                                name: "Preview",
                                onClick: () => handlePreview(Recepient),
                              },
                              {
                                name: "Change Status",
                                onClick: () => handleStatus(Recepient._id,Recepient.status),
                              },
                            ]}
                          />
                        </td>
                     */}
                </>
              </tr>
            ))}
          </tbody>
        </table>
        {
          allRecepient.length === 0 && (
            
              <div className="flex flex-col w-full gap-2 justify-center items-center min-h-screen ">
          <img src={notFound} alt="notFound" className="w-50 h-auto"/>
          <p className='text-md m-0 p-0 font-semibold'>Data Not Found !</p>
          </div>
       
          )
        }
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

export default RecepientDashboard;
