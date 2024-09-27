import React, { useEffect, useState } from "react";
import moment from "moment";
import { CSVLink } from "react-csv";
import DropActions from "./DropActions";
import "./meetingtable.css";
import Cookies from "js-cookie";
const MeetingTable = ({
  meetings,
  isLoading,
  totalMeeting,
  onClickEdit,
  loadMore,
}) => {
  console.log(meetings.length, totalMeeting);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const roles = Cookies.get("role");
    if (roles) {
      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("admin"));
    }
  }, [Cookies.get("role")]);
  useEffect(() => {
    console.log("meeutb", meetings);
  }, []);
  return (
    <div className="mt-4 overflow-scroll hide-scrollbar min-h-96">
      <table className="border-collapse border border-green-800 table-auto w-full">
        <thead>
          <tr>
            <th className="border   px-4 py-2">Title</th>
            <th className="border   px-4 py-2">Date</th>
            <th className="border   px-4 py-2">Start Time</th>
            <th className="border   px-4 py-2">End Time</th>
            <th className="border   px-4 py-2">Link</th>
            <th className="border   px-4 py-2">Scheduled By</th>
            <th className="border   px-4 py-2">Attendes</th>
            {isAdmin && <th className="border   px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 !== 0 ? "#ffffff" : "#eff2f9",
              }}
            >
              <td className="border   px-4 py-2">{meeting.title}</td>
              <td className="border   px-4 py-2">
                {moment(meeting.date).format("YYYY-MM-DD")}
              </td>
              <td className="border   px-4 py-2">
                {moment(meeting.startTime).format("HH:mm")}
              </td>
              <td className="border   px-4 py-2">
                {moment(meeting.endTime).format("HH:mm")}
              </td>
              <td className="border px-4 py-2">
                {" "}
                <a href={`${meeting.meetLink}`}>{meeting.meetLink}</a>
              </td>
              <td className="border   px-4 py-2">{meeting.from}</td>
              <td className="border  px-4 py-2">
                {meeting && meeting?.userEmails && (
                  <div className="tooltip">
                    {meeting && meeting?.userEmails[0]}{" "}
                    <strong>({meeting.userEmails.length})</strong>
                    <span className="tooltiptext">
                      {meeting.userEmails.slice(0).map((email, index) => (
                        <div key={index} className="text-sm">
                          {email}
                        </div>
                      ))}
                    </span>
                  </div>
                )}
              </td>

              {isAdmin && (
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
                      { name: "Edit", onClick: () => onClickEdit(meeting) },
                    ]}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingTable;
