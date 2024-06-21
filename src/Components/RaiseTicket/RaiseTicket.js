import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import "react-toastify/dist/ReactToastify.css";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import { toast, ToastContainer } from "react-toastify";
import { RaiseTicket, clearticketSliceStates } from '../../Redux/ticket';
import useCloudinaryUpload from "../../customHook/useCloudinaryHook";
import TinyEditor from '../TextEditor/Editor';
import { useNavigate } from "react-router-dom";
const RaiseTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isticketSliceFetchingSmall, ticketSliceErrorMessage, ticketSliceSuccessMessage, isticketSliceError, isticketSliceSuccess } = useSelector((state) => state.ticket);
  const { uploading, error, url, uploadPdf } = useCloudinaryUpload();
  const [file, setFile] = useState(null);
  const [ticketDetails, setTicketDetails] = useState({
    type: 'leave',
    description: '',
    subject: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({ ...ticketDetails, [name]: value });
  };

  const handleTemplateBodyChange = (content) => {
    setTicketDetails((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (url) {
      setTicketDetails((prevEditableEmployee) => ({
        ...prevEditableEmployee,
        documentUrl: url,
      }));
    }
  }, [url]);

  const handleUpload = () => {
    uploadPdf(file).then(() => {
      console.log("url", url);
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("ticet",ticketDetails)
    dispatch(RaiseTicket(ticketDetails));
    setTicketDetails({
      type: 'leave',
      description: '',
      subject: '',
      startDate: '',
      endDate: '',
      documentUrl:''
    });
  };

  const successToast = () => {
    toast.success(ticketSliceSuccessMessage, {
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const errorToast = () => {
    toast.error(ticketSliceErrorMessage, {
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  useEffect(() => {
    if (isticketSliceSuccess) {
      
      navigate("/admin/ticketDashboard", { replace: true });
      successToast();
    }
    return () => {
      dispatch(clearticketSliceStates());
    };
  }, [isticketSliceSuccess, dispatch]);

  useEffect(() => {
    if (isticketSliceError) {
      errorToast();
    }
    return () => {
      dispatch(clearticketSliceStates());
    };
  }, [isticketSliceError, dispatch]);

  return (
    <>
      <ToastContainer />
      <div className="p-6 flex justify-center items-start space-y-8">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-7xl space-y-4">
          <h2 className="text-2xl font-bold mb-4">Raise Ticket</h2>
          <form onSubmit={handleFormSubmit} className="mb-4 space-y-4">
            <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
              <label htmlFor="type" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Ticket Type</label>
              <select
                id="type"
                name="type"
                value={ticketDetails.type}
                style={{backgroundColor:'#eff2f9'}}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:w-2/3 md:w-full sm:w-full"
              >
                <option value="leave">Leave</option>
                <option value="task">Task</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
              <label htmlFor="subject" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Subject</label>
              <input style={{backgroundColor:'#eff2f9'}}
                id="subject"
                name="subject"
                value={ticketDetails.subject}
                onChange={handleInputChange}
                placeholder="Enter Subject"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:w-2/3 md:w-full sm:w-full"
              />
            </div>
            {(ticketDetails.type === 'leave' || ticketDetails.type === 'emergency') && (
              <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4 justify-between">
                <div className="lg:w-1/3 md:w-full sm:w-full pr-4">
                <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
                  <label htmlFor="startDate" className="block text-sm font-semibold text-left">Start Date</label>
                  <input
                  
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={ticketDetails.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " style={{backgroundColor:'#eff2f9'}}
                  />
                  </div>
                </div>
                <div className="lg:w-1/3 md:w-full sm:w-full">
                <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
                  <label htmlFor="endDate" className="block text-sm font-semibold text-left">End Date</label>
                  <input
                   style={{backgroundColor:'#eff2f9'}}
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={ticketDetails.endDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  </div>
                </div>
              </div>
            )}
            <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
              <label htmlFor="description" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Description</label>
              <div className="lg:w-2/3 md:w-full sm:w-full">
                <TinyEditor
                  onChange={handleTemplateBodyChange}
                  initialValue={ticketDetails.description}
                  style={{backgroundColor:'#eff2f9'}}
                />
              </div>
            </div>
            <div className="lg:flex lg:flex-row md:flex-col sm:flex-col mb-4">
              <label htmlFor="document" className="block text-sm font-semibold text-left lg:w-1/3 md:w-full sm:w-full">Upload Documents</label>
              <div className="lg:w-2/3 md:w-full sm:w-full">
                <input style={{backgroundColor:'#eff2f9'}}
                  name="documentUrl"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="py-2 w-full px-3 bg-white text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {uploading ? "Uploading..." : "Upload PDF"}
                </button>
                {(url || ticketDetails?.documentUrl) && (
                  <div className="mt-2">
                    <a
                      href={url || ticketDetails?.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Uploaded PDF
                    </a>
                  </div>
                )}
                {error?.documentUrl && (
                  <div className="mt-2 text-red-600">
                    {error.documentUrl}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isticketSliceFetchingSmall}
          >
            {isticketSliceFetchingSmall ? '.....' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
      





    </>
  );
};

export default RaiseTickets;
