import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import TinyEditor from "../TextEditor/Editor";
import { createtemplate, cleartemplateSliceStates } from "../../Redux/template";

const EmailTemplateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    templateSliceErrorMessage,
    templateSliceSuccessMessage,
    istemplateSliceError,
    istemplateSliceSuccess,
    istemplateSliceFetchingSmall,
  } = useSelector((state) => state.template);

  const [templateDetails, setTemplateDetails] = useState({
    title: "",
    placeholder: [
      "{{accountNumber}}",
      "{{address}}",
      "{{bankName}}",
      "{{department}}",
      "{{departmentId}}",
      "{{dob}}",
      "{{documentUrl}}",
      "{{email}}",
      "{{empId}}",
      "{{gender}}",
      "{{ifscCode}}",
      "{{image}}",
      "{{joiningDate}}",
      "{{leavestaken}}",
      "{{name}}",
      "{{password}}",
      "{{phoneNumber}}",
      "{{position}}",
      "{{positionId}}",
      "{{project}}",
      "{{projectId}}",
      "{{qualification}}",
      "{{role}}",
      "{{salary}}",
      "{{shift}}",
      "{{status}}"
    ],
    status: true,
    description: "",
    template: "",
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
    dispatch(createtemplate(templateDetails));
    setTemplateDetails({
      title: "",
      placeholder: templateDetails.placeholder, // retain the placeholder
      status: true,
      description: "",
      template: "",
    });
  };

  const successToast = () => {
    toast.success(templateSliceSuccessMessage, {
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const errorToast = () => {
    toast.error(templateSliceErrorMessage, {
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  useEffect(() => {
    if (istemplateSliceSuccess) {
      navigate("/admin/emaildashboard", { replace: true });
      successToast();
    }
    return () => {
      dispatch(cleartemplateSliceStates());
    };
  }, [istemplateSliceSuccess, dispatch]);

  useEffect(() => {
    if (istemplateSliceError) {
      errorToast();
    }
    return () => {
      dispatch(cleartemplateSliceStates());
    };
  }, [istemplateSliceError, dispatch]);

  return (
    <>
      <ToastContainer />
      <div className="p-6 flex justify-center items-start space-y-8">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-7xl space-y-4">
          <h2 className="text-2xl font-bold mb-4">Add Email Template</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="lg:flex lg:space-x-4">
              <div className="lg:w-1/2">
                <label htmlFor="title" className="block text-sm text-left font-semibold text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={templateDetails.title}
                  style={{ backgroundColor: "#eff2f9" }}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="lg:w-1/2">
                <label htmlFor="status" className="block text-sm text-left font-semibold text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={templateDetails.status}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "#eff2f9" }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
            </div>

            <div className="lg:flex lg:space-x-4">
              <div className="lg:w-1/2">
                <label htmlFor="description" className="block text-sm text-left font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={templateDetails.description}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "#eff2f9" }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <small className="flex text-left text-gray-500">
                  Describe about this email template.
                </small>
              </div>
              <div className="lg:w-1/2">
                <label htmlFor="placeholder" className="block text-sm text-left font-semibold text-gray-700">
                  Placeholders
                </label>
                <textarea
                  readOnly
                  id="placeholder"
                  name="placeholder"
                  value={templateDetails.placeholder.join(", ")}
                  style={{ backgroundColor: "#eff2f9" }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="template" className="block text-sm text-left font-semibold text-gray-700">
                Template
              </label>
              <TinyEditor
                onChange={handleTemplateBodyChange}
                initialValue={templateDetails.template}
              />
              <small className="flex text-left text-gray-500">
                You can add HTML, Text, or Images here.
              </small>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${istemplateSliceFetchingSmall ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={istemplateSliceFetchingSmall}
              >
                {istemplateSliceFetchingSmall ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailTemplateForm;
