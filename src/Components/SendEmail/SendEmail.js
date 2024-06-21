import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { cleartemplatesliceData, getAlltemplate ,sendTemplate ,cleartemplateSliceStates } from "../../Redux/template"; 
import { clearemployeeSliceData, getAllEmployee } from "../../Redux/employee";
import ComponentLoader from "../ComponentLoader/ComponentLoader";

const SendEmailComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = Cookies.get("userName");
  const email = Cookies.get("userEmail");

  const { alltemplate, istemplateSliceFetching,istemplateSliceSuccess, istemplateSliceError,templateSliceSuccessMessage, templateSliceErrorMessage } = useSelector((state) => state.template);
  const { allEmployee ,isemployeeSliceFetching } = useSelector((state) => state.employee);

  const [fromEmail, setFromEmail] = useState(email);
  const [senderName, setSenderName] = useState(name);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    let obj = { searchValue: '', pageNumber: '1', perPageCount: '100', fromDate: '01-01-2020', toDate: '01-01-2030' };
    dispatch(getAlltemplate(obj));
    dispatch(getAllEmployee(obj));
    return (()=>{
      dispatch(clearemployeeSliceData())
      dispatch(cleartemplatesliceData())
    })
  }, []);

  useEffect(() => {
    if (istemplateSliceError) {
      toast.error(templateSliceErrorMessage);
    }
  }, [istemplateSliceError, templateSliceErrorMessage]);

  useEffect(() => {
    console.log("All Employees: ", allEmployee); // Added for debugging
  }, [allEmployee]);

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleEmployeesChange = (selectedOptions) => {
    setSelectedEmployees(selectedOptions);
  };

  const handleSendEmail = () => {
    console.log("Selected", selectedEmployees, selectedTemplate);
    selectedEmployees.forEach(employee => {
      const emailData = {
        fromEmail,
        senderName,
        template: replacePlaceholders(selectedTemplate.content, {
          senderName,
          fromEmail,
       
          ...employee.empdata,  // Spread the employee data
        }),
        recipientEmail: employee.value,
        subject:selectedTemplate.label,
        employeeId: employee.id,    // Include employee id
        templateId: selectedTemplate.value // Include template id
      };
      console.log('Sending email with the following data:', emailData);
      // Implement your email sending logic here
      dispatch(sendTemplate(emailData))
      setSelectedEmployees('');
      setSelectedTemplate('');
    });
    
  };

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const templateOptions = alltemplate?.map(template => ({
    value: template._id,
    label: template.title,
    content: template.template // Include the template content here
  }));

  const employeeOptions = allEmployee?.map(employee => ({
    value: employee.email, // Use email as value for sending
    label: `${employee.name} (${employee.email})`,
    empdata: employee,
    id: employee._id // Include employee id
  }));

  const replacePlaceholders = (template, data) => {
    let content = template;
    console.log("Data for replacement:", data); // Debugging line
    for (const key in data) {
      const placeholder = `{{${key}}}`;
      content = content?.split(placeholder).join(data[key]);
    }
    console.log("Content after replacement:", content); // Debugging line
    return content;
  };

  const getSelectedTemplateContent = () => {
    if (selectedTemplate) {
      const templateContent = replacePlaceholders(selectedTemplate.content, {
        senderName,
        fromEmail,
        // Optionally, add mock employee data for preview if needed
      });
      return (
        <div dangerouslySetInnerHTML={{ __html: templateContent }}></div>
      );
    }
    return 'Select a template and employees to preview';
  };

  const successToast = () => {
    toast.success(templateSliceSuccessMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const errorToast = () => {
    toast.error(templateSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  useEffect(() => {
    if (istemplateSliceSuccess) {
      successToast();
      setTimeout(()=>navigate("/admin/recepientDashboard", { replace: true }),500)

    }
    return () => {
      dispatch(cleartemplateSliceStates());
    };
  }, [istemplateSliceSuccess]);

  useEffect(() => {
    if (istemplateSliceError) {
      errorToast();
    }
    return () => {
      dispatch(cleartemplateSliceStates());
    };
  }, [istemplateSliceError]);

  return (
    <>
    <ToastContainer/>
    {istemplateSliceFetching && isemployeeSliceFetching && <ComponentLoader/>}
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Send Email</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="senderName">Sender Name</label>
              <input
                type="text"
                id="senderName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter sender name"
                value={senderName}
                disabled={true}
                // onChange={(e) => setSenderName(senderName)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="formFromEmail">From Email</label>
              <input
                type="email"
                id="formFromEmail"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter from email"
                value={fromEmail}
                disabled={true}
                // onChange={(e) => setFromEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="formTemplate">Select Email Template</label>
              <Select
                id="formTemplate"
                options={templateOptions}
                value={selectedTemplate}
                onChange={handleTemplateChange}
                placeholder="Select a template"
                isLoading={istemplateSliceFetching}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="formEmployees">Select Employees</label>
              <Select
                id="formEmployees"
                options={employeeOptions}
                isMulti
                value={selectedEmployees}
                onChange={handleEmployeesChange}
                placeholder="Select employees"
              />
            </div>
            <button
              type="button"
              onClick={handleSendEmail}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={
                !fromEmail ||
                !senderName ||
                !isEmailValid(fromEmail) ||
                !selectedTemplate ||
                selectedEmployees.length === 0
              }
            >
              Send Email
            </button>
          </form>
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-inner">
          <h3 className="text-lg font-semibold mb-4">Template Preview</h3>
          <div className="p-4 bg-white border rounded-md">
            {getSelectedTemplateContent()}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default SendEmailComponent;
