import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const EditMeetModal = ({ isOpen, onClose, meeting, onSave ,ismeetingSliceFetchingSmall}) => {
  const [meetingDetails, setMeetingDetails] = useState({
    title: "",
    startTime: "",
    endTime: "",
    link: "",
    id: "",
    date: "",
    
  });

  useEffect(() => {
    if (meeting) {
      setMeetingDetails({
        id: meeting.event?.id || meeting._id,
        title: meeting.event?.title || meeting.title,
        link: meeting.event?.extendedProps?.link || meeting.meetLink,
        startTime: moment(meeting.event?.start || meeting.startTime).format("HH:mm"),
        endTime: moment(meeting.event?.end || meeting.endTime).format("HH:mm"),
        date: moment(meeting.event?.start || meeting.startTime).format("YYYY-MM-DD"),
      });
      console.log("meet", meeting);
    }
  }, [meeting]); 
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((meet) => ({
      ...meet,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Edit Meeting</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            
            onSave(meetingDetails);
          }}
        >
          <label className="block mb-2">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              value={meetingDetails.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Start Time:
            <input
              type="time"
              name="startTime"
              value={meetingDetails.startTime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            End Time:
            <input
              type="time"
              name="endTime"
              value={meetingDetails.endTime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Link:
            <input
              type="text"
              name="link"
              value={meetingDetails.link}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Date:
            <input
              type="date"
              name="date"
              value={meetingDetails.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 p-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={ismeetingSliceFetchingSmall}
              className="p-2 bg-blue-600 text-white rounded"
            >
             {ismeetingSliceFetchingSmall ? '...' : 'Save' } 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeetModal;
