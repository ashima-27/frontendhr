import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import "react-toastify/dist/ReactToastify.css";

import { toast, ToastContainer } from "react-toastify";

import { createtemplate,cleartemplateSliceStates } from "../../Redux/template"
import ComponentLoader from '../../Components/ComponentLoader/ComponentLoader';
import TinyEditor from '../../Components/TextEditor/Editor';
const EditTemplate = ({template,onClose,onEdit}) => {
    const dispatch = useDispatch();
    const { templateSliceErrorMessage, templateSliceSuccessMessage, istemplateSliceError, istemplateSliceSuccess } = useSelector((state) => state.template);
    
  const [templateDetails, setTemplateDetails] = useState({
    title: '',
    placeholder: '',
    status: '',
    description: '',
    template:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTemplateDetails({ ...templateDetails, [name]: value });
  };

  const handleTemplateBodyChange = (content) => {
    setTemplateDetails((prevData) => ({
      ...prevData,
      template: content,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', templateDetails);
 onEdit(templateDetails);
    setTemplateDetails({
        title: '',
        placeholder: '',
        status: '',
        description: '',
        template:'',
    })
    // You can add logic to dispatch an action to save the template
  };



  useEffect(()=>{
   setTemplateDetails(template)
  },[template]);

  return (
   
    <><ToastContainer />
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg m-5">
         <h2 className="text-2xl font-bold mb-4">Edit {templateDetails.title} Template</h2>
         <button
                onClick={onClose}
                className="ml-auto bg-transparent border-none text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="lg:flex lg:space-x-4">
          <div className="lg:w-1/2">
            <label htmlFor="title" className="block text-sm text-left font-semiboldtext-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={templateDetails.title}
              style={{backgroundColor:'#eff2f9'}}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="lg:w-1/2">
          <label htmlFor="status" className="block text-sm  text-left font-semiboldtext-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={templateDetails.status}
              onChange={handleInputChange}
              style={{backgroundColor:'#eff2f9'}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
        
      
          </div>
         
        </div>

        <div className="lg:flex lg:space-x-4">
          <div className="lg:w-1/2">
            <label htmlFor="status" className="block text-sm text-left font-semiboldtext-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              value={templateDetails.description}
              onChange={handleInputChange}
              style={{backgroundColor:'#eff2f9'}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <small className=' flex text-left text-gray-500'>Decribe about this email template.</small>
          </div>
          <div className="lg:w-1/2">
            <label htmlFor="subject" className="block text-sm text-left font-semiboldtext-gray-700">
             PlaceHolder
            </label>
            <textarea
              id="placeholder"
              name="placeholder"
              type="text"
              value={templateDetails.placeholder}
              style={{backgroundColor:'#eff2f9'}}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        

        <div>
          <label htmlFor="template" className="block text-sm text-left font-semiboldtext-gray-700">
           Template
          </label>
          <TinyEditor
            onChange={handleTemplateBodyChange}
            initialValue={templateDetails.template}
          />
          <small  className=' flex text-left text-gray-500'>This design will show in recieved email and place holders will replace with dynamic content.</small>
        </div>

        <div className="flex justify-end">
        <button
                    type="button"
                    onClick={onClose}
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Cancel
                  </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent text-sm text-left font-semiboldrounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
};

export default EditTemplate;
