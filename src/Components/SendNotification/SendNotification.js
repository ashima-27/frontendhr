import React, { useState } from 'react';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const SendNotification = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const sendNotification = async () => {
    try {
      await axios.post(`${apiUrl}/notify`, { title, body });
      toast.success('Notification sent successfully', {
        // position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000, 
        hideProgressBar: false, 
        pauseOnHover: true, 
      });
      setTitle('')
      setBody('')
    
    } catch (error) {
      console.error('Error sending notification', error);
      toast.error('Failed to send notification', {
        // position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000, 
        hideProgressBar: false, 
        pauseOnHover: true, 
      });
    }
  };

  return (<>
    <ToastContainer />
    <div className='flex h-screen justify-center items-center'>
    <div className="w-96 h-96 mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Send Notification</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Notification Title"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Notification Body"
          className="w-full h-32 resize-none border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <button
          onClick={sendNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send Notification
        </button>
      </div>
    </div>
  </div>
  </>
  
  
  );
};

export default SendNotification;
