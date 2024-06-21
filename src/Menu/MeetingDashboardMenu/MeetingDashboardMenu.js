import React, { useState, useEffect } from "react";
import Dropdown from "../../global/Dropdown";
import moment from "moment";
import { CSVLink } from "react-csv";

const MeetingDashboardMenu = ({
  searchFunction,
  clearSearch,
  buttonName,
  buttonName2,
  onClickToggle,
  onClickCreateMeeting,
  onClickDownloadEmployee,
  buttonName1,
  employee,
  options,
  onSelect,
  setIsActive,
  isActive,
  dropName,
  meetings,
  totalMeeting,
  showingMeeting,
  setFromDate,
  setToDate
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().endOf('month').format('YYYY-MM-DD'));


  useEffect(() => {
    console.log("tyi", buttonName2.props.icon.iconName);
  }, [buttonName2]);

  useEffect(() => {
    setFromDate(startDate);
    setToDate(endDate);
  }, [startDate, endDate, setFromDate, setToDate]);

  const handleSearchChange = (e) => {
    console.log("sc", e.target.value);
    setSearchValue(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchFunction(searchValue);
    }
  };

  const headers = [
    { label: "Title", key: "title" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    { label: "Link", key: "link" },
  ];

  const csvData = meetings.map((meeting) => ({
    title: meeting.title,
    startTime: moment(meeting.startTime).format("YYYY-MM-DD HH:mm"),
    endTime: moment(meeting.endTime).format("YYYY-MM-DD HH:mm"),
    link: meeting.link,
  }));

  return (
    <>
      <header className="p-2">

          {buttonName2.props.icon.iconName === 'table' ? (
            <>
            <div className="flex justify-between">
              <div className="flex justify-start lg:order-1">
                <button
                  onClick={onClickToggle}
                  type="button"
                  className="text-black bg-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {buttonName2}
                </button>
              </div>
              <div className="flex justify-center lg:order-2 font-semibold text-xl">All Meetings</div>
              <div className="flex justify-end lg:order-3">
                <CSVLink
                  className="downloadCSV"
                  data={csvData}
                  headers={headers}
                  filename="Employee Data"
                >
                  <button
                    onClick={onClickDownloadEmployee}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Download
                  </button>
                </CSVLink>
              </div>
              </div>
            </>
          ) : (
            <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <div className="flex justify-center lg:order-1">
                <form className="max-w-md mx-auto lg:ml-0 flex">
                  <div className="mr-4">
                    {/* <label
                      htmlFor="sd"
                      className="text-sm text-black text-left mb-1"
                    >
                      Start Date
                    </label> */}
                    <input
                      type="date"
                      name="sd"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>
                  <div>
                    {/* <label
                      htmlFor="ld"
                      className="text-sm text-black text-left mb-1"
                    >
                      End Date
                    </label> */}
                    <input
                      type="date"
                      name="ld"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>
                </form>
              </div>
              

              <div className="flex justify-center lg:order-2">
                <h6>Showing {showingMeeting} out of {totalMeeting}</h6>
              </div>
              <div className="flex justify-end lg:order-3">
                <Dropdown
                  options={options}
                  onSelect={onSelect}
                  setIsActive={setIsActive}
                  isActive={isActive}
                  dropName={dropName}
                />
                <button
                  onClick={onClickToggle}
                  type="button"
                  className="text-black bg-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {buttonName2}
                </button>
                <button
                  onClick={onClickCreateMeeting}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {buttonName}
                </button>

                <CSVLink
                  className="downloadCSV"
                  data={csvData}
                  headers={headers}
                  filename="Employee Data"
                >
                  <button
                    onClick={onClickDownloadEmployee}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Download
                  </button>
                </CSVLink>
              </div>
              </div>

            </>
          )}
       
      </header>
    </>
  );
};

export default MeetingDashboardMenu;
