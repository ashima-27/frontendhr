import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faTable } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Cookies from "js-cookie";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import { toast, ToastContainer } from "react-toastify";
import {
  ScheduleMeeting,
  clearemeetingSliceData,
  getAllMeeting,
  getAllMeetingById,
  updateMeeting,
  getAllEmployee,
  clearemployeeSliceStates,
  clearemployeeSliceData,
} from "../../Redux/employee";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./meet.css";
import moment from "moment-timezone";
import MeetingTable from "../../global/MeetingTable";
import MeetingDashboardMenu from "../../Menu/MeetingDashboardMenu/MeetingDashboardMenu";
import EditMeetModal from "../../Popups/EditMeeting/EditMeeting";
import notFound from "../../assets/images/notFound.png";
const MeetingScheduler = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [fromDate, setFromDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const email = Cookies.get("userEmail");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedMeet, setSelectedMeet] = useState(null);
  const currentTime = moment().format("HH:mm");
  const [viewMode, setViewMode] = useState("card");
  const [meetingDetails, setMeetingDetails] = useState({
    title: "",
    startTime: moment().format("HH:mm"),
    endTime: moment().format("HH:mm"),
    link: "",
    id: "",
    date: moment().format("YYYY-MM-DD"),
  });
  const [isPerPageDrop, setIsPerPageDrop] = useState(false);
  const [perPageDropName, setPerPageDropName] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const {
    allMeeting,
    totalMeeting,
    ismeetingSliceFetching,
    ismeetingSliceFetchingSmall,
    ismeetingSliceSuccess,
    ismeetingSliceError,
    meetingSliceErrorMessage,
    allEmployee,
    meetingSliceSuccessMessage,
  } = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "card" ? "table" : "card"));
  };
  useEffect(() => {
    const roles = Cookies.get("role");
    if (roles) {
      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("admin"));
    }
  }, [Cookies.get("role")]);

  const handleDateSelect = (arg) => {
    setShowModal(true);
    setSelectedDate(moment(arg.start).format("YYYY-MM-DD"));
    setMeetingDetails({
      ...meetingDetails,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);

    const startTime = moment(
      `${selectedDate} ${meetingDetails.startTime}`,
      "YYYY-MM-DD HH:mm"
    );
    const endTime = moment(
      `${selectedDate} ${meetingDetails.endTime}`,
      "YYYY-MM-DD HH:mm"
    );
    if (endTime.isSameOrBefore(startTime)) {
      toast.error("End time must be later than start time.");
      return;
    }

    const sendTo = selectedEmployees.map((emp) => emp.id);

    const newEvent = {
      title: meetingDetails.title,
      startTime: startTime,
      endTime: endTime,
      link: meetingDetails.link,
      date: selectedDate,
      sendTo: sendTo,
      from: email,
    };
    console.table("New Event:", newEvent);
    dispatch(ScheduleMeeting(newEvent));
    setMeetingDetails("");
  };
  const handleEmployeesChange = (selectedOptions) => {
    setSelectedEmployees(selectedOptions);
  };

  const handleUpdateSubmit = (updatedMeeting) => {
    const startTime = moment(
      `${updatedMeeting.date} ${updatedMeeting.startTime}`,
      "YYYY-MM-DD HH:mm"
    );
    const endTime = moment(
      `${updatedMeeting.date} ${updatedMeeting.endTime}`,
      "YYYY-MM-DD HH:mm"
    );

    if (endTime.isSameOrBefore(startTime)) {
      toast.error("End time must be later than start time.");
      return;
    }
    const updatedEvent = {
      title: updatedMeeting.title,
      link: updatedMeeting.link,
      startTime: startTime,
      endTime: endTime,
      id: updatedMeeting.id,
    };

    console.log("updte", updatedEvent);
    dispatch(updateMeeting(updatedEvent));
    setShowModal(false);
  };
  const handleEventClick = (info) => {
    const event = info.event;
    console.log("clicked", info);

    setSelectedMeet(info);
    setShowEdit(true);
  };

  const eventContent = (arg) => {
    const startDateTime = moment(arg.event._instance.range.start);
    const endDateTime = moment(arg.event._instance.range.end);

    const momentDateTimeStart = moment
      .utc(arg.event._instance.range.start)
      .tz("Asia/kolkata");
    const momentDateTimeEnd = moment
      .utc(arg.event._instance.range.end)
      .tz("Asia/kolkata");
    // Subtract 5 hours and 30 minutes
    const istDateTimeStart = momentDateTimeStart
      .subtract(5, "hours")
      .subtract(30, "minutes");
    const istDateTimeEnd = momentDateTimeEnd
      .subtract(5, "hours")
      .subtract(30, "minutes");
    const formattedStartDateTime = istDateTimeStart.format("HH:mm");
    const formattedEndDateTime = istDateTimeEnd.format("HH:mm");
    const eventDate = startDateTime.startOf("day");
    const todayDate = moment().startOf("day");
    const isUpcoming = eventDate.isAfter(todayDate);
    const eventClassName = isUpcoming ? "upcoming-meeting" : "past-meeting";
    const link = arg.event.extendedProps.link;

    return {
      html: `<div class="fc-content ${eventClassName}" style="padding: 10px; margin-bottom: 10px;" style="z-index: 100;">
      <table style="width: 100%;">
       <tr class="" >
         
              <td>${arg.event.title}</td>
          </tr>
          <tr>
              <td class="time-value" >${formattedStartDateTime} - ${formattedEndDateTime} </td>
           
          </tr>
          
          <tr class="" >
           
              <td><a href="${link}" target="_blank">${link}</a></td>
          </tr>
      </table>
  </div>
  `,
    };
  };

  const loadMore = () => {
    if (isAdmin) {
      dispatch(
        getAllMeeting({
          perPageCount: perPageDropName,
          pageNumber: currentPage + 1,
          fromDate: fromDate,
          toDate: toDate,
        })
      );
    } else {
      dispatch(
        getAllMeetingById({
          perPageCount: perPageDropName,
          pageNumber: currentPage + 1,
          fromDate: fromDate,
          toDate: toDate,
        })
      );
    }

    setCurrentPage(currentPage + 1);
  };
  const employeeOptions = allEmployee?.map((employee) => ({
    value: employee.email, // Use email as value for sending
    label: `${employee.name} (${employee.email})`,
    empdata: employee,
    id: employee._id, // Include employee id
  }));
  useEffect(() => {
    if (viewMode === "table") {
      let obj = {
        perPageCount: perPageDropName,
        pageNumber: currentPage,
        fromDate: fromDate,
        toDate: toDate,
      };
      console.log("obj", obj);
      if (isAdmin) {
        dispatch(getAllMeeting(obj));
      } else {
        dispatch(getAllMeetingById(obj));
      }
      return () => {
        dispatch(clearemeetingSliceData());
      };
    }
  }, [isAdmin, perPageDropName, fromDate, toDate, viewMode]);

  const onChangePerPage = (obj) => {
    setPerPageDropName(obj.id);
  };
  useEffect(() => {
    let obj = {
      searchValue: "",
      pageNumber: "1",
      perPageCount: "100",
      fromDate: "01-01-2020",
      toDate: "01-01-2030",
    };
    // dispatch(getAlltemplate(obj));
    dispatch(getAllEmployee(obj));
    return () => {
      dispatch(clearemployeeSliceData());
    };
  }, []);

  const successToast = () => {
    toast.success(meetingSliceSuccessMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const errorToast = () => {
    toast.error(meetingSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  useEffect(() => {
    if (ismeetingSliceSuccess) {
      setShowEdit(false);
      successToast();
    }
    return () => {
      dispatch(clearemployeeSliceStates());
    };
  }, [ismeetingSliceSuccess]);

  useEffect(() => {
    if (ismeetingSliceError) {
      errorToast();
    }
    return () => {
      dispatch(clearemployeeSliceStates());
    };
  }, [ismeetingSliceError]);
  useEffect(() => {
    if (viewMode !== "table") {
      // const currentMonth = moment();
      let obj = {
        perPageCount: totalMeeting,
        pageNumber: 1,
        fromDate: moment().startOf("month").format("YYYY-MM-DD"),
        toDate: moment().endOf("month").format("YYYY-MM-DD"),
      };
      if (isAdmin) {
        dispatch(getAllMeeting(obj));
      } else {
        dispatch(getAllMeetingById(obj));
      }
    }
    return () => {
      dispatch(clearemeetingSliceData());
    };
  }, [isAdmin, viewMode]);
  return (
    <>
      <div className="px-4 py-1">
        <ToastContainer />
        {ismeetingSliceFetching && <ComponentLoader />}
        <div className="max-w-7xl mx-auto pt-2 px-4 m-4 mb-6 bg-white shadow-md rounded-lg">
          <MeetingDashboardMenu
            meetings={allMeeting}
            onClickCreateMeeting={() => setShowModal(true)}
            buttonName={"Create"}
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
              { name: "Max", id: totalMeeting },
            ]}
            isActive={isPerPageDrop}
            setIsActive={setIsPerPageDrop}
            onSelect={onChangePerPage}
            dropName={perPageDropName}
            totalMeeting={totalMeeting}
            showingMeeting={allMeeting.length}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </div>
        <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg overflow-scroll hide-scrollbar">
          {showEdit && isAdmin && (
            <EditMeetModal
              meeting={selectedMeet}
              onSave={handleUpdateSubmit}
              isOpen={showEdit}
              onClose={() => setShowEdit(false)}
              ismeetingSliceFetchingSmall={ismeetingSliceFetchingSmall}
            />
          )}
          {viewMode === "table" ? (
            <>
              <MeetingTable
                meetings={allMeeting}
                totalMeeting={totalMeeting}
                handleFormSubmit={handleFormSubmit}
                onClickEdit={(meeting) => handleEventClick(meeting)}
                loadMore={loadMore}
                isLoading={ismeetingSliceFetching}
              />
              {allMeeting.length === 0 && (
                <div className="flex flex-col w-full gap-2 justify-center items-center min-h-screen ">
                  <img src={notFound} alt="notFound" className="w-50 h-auto" />
                  <p className="text-md m-0 p-0 font-semibold">
                    Data Not Found !
                  </p>
                </div>
              )}
              {allMeeting?.length !== totalMeeting && (
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block bg-blue-500 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 mt-4"
                  type="button"
                  onClick={() => {
                    console.log("Load More clicked");
                    loadMore();
                  }}
                >
                  Load More
                </button>
              )}
            </>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              editable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              select={handleDateSelect}
              events={allMeeting.map((meeting) => ({
                id: meeting._id,
                title: meeting.title,
                start: meeting.startTime,
                end: meeting.endTime,
                link: meeting.meetLink,
              }))}
              eventClick={handleEventClick}
              eventContent={eventContent}
              headerToolbar={{
                start: "today prev next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
            />
          )}
        </div>
      </div>
      {showModal && isAdmin && (
        <div className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleFormSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                        Create New Meeting
                      </h3>

                      <div className="mt-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title:
                        </label>
                        <input
                          type="text"
                          id="title"
                          placeholder="Enter Title"
                          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none"
                          value={meetingDetails.title}
                          onChange={(e) =>
                            setMeetingDetails({
                              ...meetingDetails,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor="start-time"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Time:
                        </label>
                        <input
                          type="time"
                          id="start"
                          name="start"
                          onChange={(event) =>
                            setMeetingDetails({
                              ...meetingDetails,
                              startTime: event.target.value,
                            })
                          }
                          value={meetingDetails.startTime}
                          className="mt-1 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor="end-time"
                          className="block text-sm font-medium text-gray-700"
                        >
                          End Time:
                        </label>
                        <input
                          type="time"
                          id="end"
                          name="end"
                          onChange={(event) =>
                            setMeetingDetails({
                              ...meetingDetails,
                              endTime: event.target.value,
                            })
                          }
                          value={meetingDetails.endTime}
                          className="mt-1 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor="link"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Link:
                        </label>
                        <input
                          type="text"
                          id="link"
                          placeholder="Enter Link"
                          className="mt-1 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={meetingDetails.link}
                          onChange={(e) =>
                            setMeetingDetails({
                              ...meetingDetails,
                              link: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mt-4 mb-6">
                        <label
                          className="block text-sm font-medium text-gray-700"
                          htmlFor="formEmployees"
                        >
                          Select Employees
                        </label>
                        <Select
                          id="formEmployees"
                          options={employeeOptions}
                          isMulti
                          value={selectedEmployees}
                          onChange={handleEmployeesChange}
                          placeholder="Select employees"
                          className="w-full"
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              borderColor: "gray",
                              boxShadow: "none",
                              "&:hover": {
                                borderColor: "indigo",
                              },
                            }),
                            menu: (provided) => ({
                              ...provided,
                              zIndex: 999999,
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                            }),
                            menuList: (provided) => ({
                              ...provided,
                              maxHeight: 400,
                              overflowY: "auto",
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={ismeetingSliceFetchingSmall}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {ismeetingSliceFetchingSmall ? "..." : "Create Meeting"}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingScheduler;
