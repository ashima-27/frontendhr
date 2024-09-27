import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import {
  getAllTicket,
  getAllTicketById,
  updateTicket,
  clearticketSliceStates,
  deleteTicket,
  clearticketsliceData,
  ticket,
  updateTicketStatus,
} from "../../Redux/ticket"; // Adjust the import based on your file structure
import DropActions from "../../global/DropActions";
import { isPending } from "@reduxjs/toolkit";
import Menu from "../../Menu/NotificationMenu/NotificationMenu";
import Pagination from "../../global/Pagination";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import { toast, ToastContainer } from "react-toastify";
import notFound from "../../assets/images/notFound.png";
const TicketsDashboard = () => {
  const dispatch = useDispatch();
  const roles = Cookies.get("role");
  const [filterType, setFilterType] = useState("all");
  const {
    allTicket,
    status,
    error,
    totalTicket,
    isticketSliceFetching,
    isticketSliceSuccess,
    isticketSliceError,
    ticketSliceErrorMessage,
    ticketSliceSuccessMessage,
  } = useSelector((state) => state.ticket);
  const [editMode, setEditMode] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPerPageDrop, setIsPerPageDrop] = useState(false);
  const [perPageDropName, setPerPageDropName] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const [editedTicket, setEditedTicket] = useState({
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
    if (isAdmin) {
      dispatch(getAllTicket(obj));
    } else {
      dispatch(getAllTicketById(obj));
    }
    return () => {
      dispatch(clearticketsliceData());
    };
  }, [isAdmin, searchQuery, perPageDropName, currentPage, startDate, endDate]);

  useEffect(() => {
    console.log("roles", roles);
    if (roles) {
      console.log("hj", roles ? true : false);

      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("admin"));
    }
  }, [roles]);
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket({ ...editedTicket, [name]: value });
  };
  const successToast = () => {
    toast.success(ticketSliceSuccessMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const errorToast = () => {
    toast.error(ticketSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  useEffect(() => {
    if (isticketSliceSuccess) {
      successToast();
    }
    return () => {
      dispatch(clearticketSliceStates());
    };
  }, [isticketSliceSuccess]);

  useEffect(() => {
    if (isticketSliceError) {
      errorToast();
    }
    return () => {
      dispatch(clearticketSliceStates());
    };
  }, [isticketSliceError]);
  const handleEdit = (ticket) => {
    setEditMode(ticket.id);
    setEditedTicket(ticket);
  };

  const handleUpdate = () => {
    console.log("edi", editedTicket);
    dispatch(updateTicket(editedTicket));
    setEditMode(null);
  };

  const handleDelete = (id) => {
    console.log("id", id);
    dispatch(deleteTicket({ id: id }));
  };

  const handleStatus = (id, status) => {
    console.log("id", id, status);
    let obj = {
      id: id,
      status: status,
    };
    dispatch(updateTicketStatus(obj));
  };
  const filteredTickets = allTicket?.filter(
    (ticket) => filterType === "all" || ticket?.type === filterType
  );
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
    setTotalPages(Math.ceil(totalTicket / perPageDropName));
  }, [totalTicket, perPageDropName]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#fff8dc", color: "#8b8000" }; // Light yellow background, dark yellow text
      case "Rejected":
        return { backgroundColor: "#ffe4e1", color: "#ff0000" }; // Light red background, red text
      case "Approved":
        return { backgroundColor: "#e6ffe6", color: "#008000" }; // Light green background, green text
      default:
        return { backgroundColor: "#fff8dc", color: "#8b8000" }; // Default white background, black text
    }
  };
  return (
    <>
      <ToastContainer />
      {isticketSliceFetching && <ComponentLoader />}
      <div className="px-4 py-1 ">
        <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg">
          <Menu
            options={[
              { name: "10", id: 10 },
              { name: "20", id: 20 },
              { name: "30", id: 30 },
              { name: "Max", id: totalTicket },
            ]}
            searchFunction={searchHandler}
            clearSearch={clearSearch}
            isActive={isPerPageDrop}
            setIsActive={setIsPerPageDrop}
            onSelect={onChangePerPage}
            dropName={perPageDropName}
            startDate={startDate}
            showing={allTicket.length}
            total={totalTicket}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            isCreate={isAdmin ? false :true}
            isCreateLink={"/raiseticket"}
            isCreateName={"Raise Ticket"}
          />
        </div>
        <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg h-full overflow-scroll hide-scrollbar">
          <table className="table-auto border-collapse border border-slate-500 mt-5 w-full">
            <thead>
              <tr>
                <th className="  p-2">Type</th>
                <th className="  p-2">Subject</th>
                <th className="  p-2">Description</th>
                <th className="  p-2">Date</th>
                {isAdmin && <th className="  p-2">Raised By</th>}
                <th className="  p-2">Raised On</th>
                <th className="  p-2">Attachment</th>
                {!isAdmin && <th className="  p-2">Status</th>}
                {!isAdmin && <th className="  p-2">Actions</th>}
                {isAdmin && <th className="  p-2">Status</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTickets?.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  style={{
                    backgroundColor: index % 2 !== 0 ? "#ffffff" : "#eff2f9",
                  }}
                >
                  <td className=" capitalize p-2">{ticket.type}</td>
                  <td className=" capitalize p-2">{ticket.subject}</td>
                  <td className="  capitalize p-2">
                    {" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ticket.description,
                      }}
                    ></span>
                  </td>
                  <td className="  p-2">
                    {new Date(ticket.startDate).toLocaleDateString()} -{" "}
                    {ticket.endDate
                      ? new Date(ticket.endDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  {isAdmin && (
                    <td>
                      <div className="text-sm  capitalize font-medium text-gray-900">
                        <NavLink
                          to={`/admin/empdetails?id=${ticket.employeeId}`}
                        >
                          {" "}
                          {ticket?.employeeName}
                        </NavLink>
                      </div>
                      <div className="text-sm text-gray-500">
                        {" "}
                        {ticket?.employeeEmail}
                      </div>
                    </td>
                  )}
                  <td className="  p-2">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  
                    <td className="  p-2">
                      <Link to={ticket?.documentUrl}>
                        <button className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {ticket?.documentUrl ? ' View ' :' N/A'}
                        </button>
                      </Link>
                    </td>
                  

                  {!isAdmin && (
                    <td className=" p-2 ">
                      <span
                        style={getStatusStyle(ticket.status)}
                        className="p-2"
                      >
                        {" "}
                        {ticket.status ? ticket.status : "Pending"}{" "}
                      </span>
                    </td>
                  )}
                  {!isAdmin && (
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
                          // { name: "Edit",   onClick: () => handleEdit(ticket), },
                          {
                            name: "Delete",
                            onClick: () => handleDelete(ticket._id),
                          },
                        ]}
                      />
                    </td>
                  )}
                  {isAdmin && (
                    <td className="border  px-4 py-2">
                      <DropActions
                        heading={ticket.status ? ticket.status : "Pending"}
                        style={getStatusStyle(ticket.status)}
                        options={[
                          {
                            name: "Approved",
                            onClick: () => handleStatus(ticket._id, "Approved"),
                          },
                          {
                            name: "Pending",
                            onClick: () => handleStatus(ticket._id, "Pending"),
                          },
                          {
                            name: "Rejected",
                            onClick: () => handleStatus(ticket._id, "Rejected"),
                          },
                        ]}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTickets.length === 0 && (
            <div className="flex flex-col w-full gap-2 justify-center items-center min-h-screen ">
              <img src={notFound} alt="notFound" className="w-50 h-auto" />
              <p className="text-md m-0 p-0 font-semibold">Data Not Found !</p>
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

export default TicketsDashboard;
