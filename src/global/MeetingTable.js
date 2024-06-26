import React from "react";
import moment from "moment";
import { CSVLink } from "react-csv";
import DropActions from "./DropActions";
import "./meetingtable.css"
const MeetingTable = ({ meetings ,isLoading,totalMeeting,onClickEdit,loadMore }) => {
 console.log(meetings.length,totalMeeting)

  return (
    <div className="mt-4 overflow-scroll hide-scrollbar">
     
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
            <th className="border   px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 !== 0 ? "#ffffff" : "#eff2f9" }}>
              <td className="border   px-4 py-2">{meeting.title}</td>
              <td className="border   px-4 py-2">{moment(meeting.date).format("YYYY-MM-DD")}</td>
              <td className="border   px-4 py-2">{moment(meeting.startTime).format("HH:mm")}</td>
              <td className="border   px-4 py-2">{moment(meeting.endTime).format("HH:mm")}</td>
              <td className="border   px-4 py-2">{meeting.meetLink}</td>
              <td className="border   px-4 py-2">{meeting.from}</td>
               <td className="border  px-4 py-2">
        <div className="tooltip">
          {meeting.sendTo[0]} <strong>({meeting.sendTo.length})</strong>
          <span className="tooltiptext">
            {meeting.sendTo.slice(0).map((email, index) => (
              <div key={index} className="text-sm">{email}</div>
            ))}
          </span>
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
                { name: "Edit",   onClick: () => onClickEdit(meeting), },
             ]}
                 />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default MeetingTable;
