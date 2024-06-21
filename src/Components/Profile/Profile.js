import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user_3177440.png"; // Update the path accordingly
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import useCloudinaryUpload from "../../customHook/useCloudinaryHook";
import { toast, ToastContainer } from "react-toastify";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import {
  getProfile,
 
  clearAllPositions,
  clearProfile,
  clearemployeeSliceStates
} from "../../Redux/employee";
import { useLocation, useNavigate } from "react-router-dom";
const Profile = () => {
  const { profile, allProjects, allPositions, allDepartments ,isemployeeByIdSliceFetching,isemployeeByIdSliceError,isemployeeByIdSliceSuccess,employeeByIdSliceSuccessMessage,employeeByIdSliceErrorMessage} = useSelector(
    (state) => state.employee
  );
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [editableEmployee, setEditableEmployee] = useState({});

 

 
  useEffect(() => {
   
      dispatch(getProfile());

    return(()=>{
      dispatch(clearProfile())
    })
  }, [id, dispatch]);

  useEffect(() => {
    if (profile && profile.Data) {
      console.log("Profile data:", profile);
      setEditableEmployee({
        ...profile.Data,
        dob: moment(profile.Data.dob).format("YYYY-MM-DD"),
        shift: profile.Data.shift,
        documentUrl: profile.Data.documentUrl,
        departmentName: profile.department,
        position: profile.position,
        project: profile.project
      });
    }
  }, [profile]);

  useEffect(() => {
    console.log("Updated editableEmployee:", editableEmployee);
  }, [editableEmployee]);

 
  const errorToast = () => {
    toast.error(employeeByIdSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true, 
    });
  };


  useEffect(() => {
    if (isemployeeByIdSliceError) {
      errorToast(); 
    }
    return()=>{
       dispatch(clearemployeeSliceStates())
    }
  }, [isemployeeByIdSliceError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Selected position ID:", value);
    setEditableEmployee((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
       <ToastContainer />
    {isemployeeByIdSliceFetching && <ComponentLoader />}
    {editableEmployee && (
      <div className="p-6 flex justify-center items-start space-y-8">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-7xl space-y-4">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div
              className="lg:w-1/3 w-full shadow-md rounded-lg p-4"
              style={{ backgroundColor: "#a5bdec36" }}
            >
              <div className="flex flex-col justify-center items-center space-y-4">
                <img
                  className="w-42 h-32  border border-indigo-600"
                  style={{ borderRadius: "10px" }}
                  src={editableEmployee?.image ? editableEmployee.image : user}
                  alt={editableEmployee?.name}
                />
               
              
             
                <div className="text-center w-full">
                  {/* <h6 className="font-semibold mb-4 text-black uppercase">EMPLOYEE'S PERSONAL INFORMATION</h6> */}
                  <div className="flex flex-col items-start w-full mt-4">
                    <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                     disabled={true}
                      value={editableEmployee?.name || ""}
                      onChange={handleInputChange}
                      className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    />
                    <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                      Date Of Birth:
                    </label>
                    <input
                      type="date"
                      name="dob"
                      disabled={true}
                      value={editableEmployee?.dob || ""}
                      onChange={handleInputChange}
                      className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    />
                    <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      disabled={true}
                      value={editableEmployee?.email || ""}
                      onChange={handleInputChange}
                      className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    />
                    <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      disabled={true}
                      name="phoneNumber"
                      value={editableEmployee?.phoneNumber || ""}
                      onChange={handleInputChange}
                      className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    />
                    <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                      Gender:
                    </label>
                    <input
                      type="text"
                      disabled={true}
                      name="gender"
                      value={editableEmployee?.gender || ""}
                      onChange={handleInputChange}
                      className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    />
                    <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                      Address:
                    </label>
                    <input
                      type="text"
                      name="address"
                      disabled={true}
                      value={editableEmployee?.address || ""}
                      onChange={handleInputChange}
                      className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Job Details */}
            <div
              className="lg:w-1/3 w-full shadow-md rounded-lg p-4 "
              style={{ backgroundColor: "#a5bdec36" }}
            >
              <h6 className="font-semibold mb-4 text-black text-center uppercase">
                Job Details
              </h6>
              <div className="flex flex-col items-start w-full mt-4">
                <label
                  htmlFor="department"
                  className="text-sm  font-bold  text-black block text-left m-1 p-1"
                >
                  Department
                </label>
                <select
                  name="departmentName"
                   disabled={true} value={editableEmployee.departmentName}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">{editableEmployee.departmentName}</option>

                
                </select>
                <label
                  htmlFor="role"
                  className="text-sm  font-bold  text-black block text-left m-1 p-1"
                >
                  Role
                </label>
                <select
                  name="position"
                  disabled={true}
                  value={editableEmployee.position}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">{editableEmployee.position}</option>
                  
                </select>
                <label
                  htmlFor="project"
                  className="text-sm  font-bold  text-black block text-left m-1 p-1"
                >
                  Project Working On
                </label>
                <select
                  name="project"
                  value={editableEmployee.project}
                  onChange={handleInputChange}
                  disabled={true}
                  className="py-2 px-3 w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">{editableEmployee.project}</option>
                
                </select>

                <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  disabled={true}
                  value={
                    editableEmployee?.joiningDate
                      ? moment(editableEmployee?.joiningDate).format(
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />

                <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  disabled={true}
                  value={editableEmployee?.qualification || ""}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />
                <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                  Skills
                </label>
                <input
                  type="text"
                  name="qualification"
                  disabled={true}
                  value={editableEmployee?.qualification || ""}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />
                <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                  Salary 
                  
                </label>
                <input
                  type="text"
                  disabled={true}
                  name="salary"
                  value={editableEmployee?.salary || ""}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />
                <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                  Shift
                </label>
                <select
                  name="shift"
                  disabled={true}
                  value={editableEmployee?.shift || ""}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                >
                  <option key="Hybrid"  value="Hybrid">
                    Hybrid
                  </option>
                  <option key="Onsite" value="Onsite">
                    Onsite
                  </option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Column 3: Bank Details and Authorized Emails */}
            <div className="lg:w-1/3 w-full flex flex-col space-y-4">
              {/* Bank Details */}
              <div
                className="shadow-md rounded-lg p-4 "
                style={{ backgroundColor: "#a5bdec36" }}
              >
                <h6 className="font-semibold mb-4 text-black text-center uppercase">
                  Bank Details
                </h6>
                <div className="flex flex-col items-start w-full mt-4">
                  <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                     disabled={true} value={editableEmployee?.bankName || ""}
                    onChange={handleInputChange}
                    className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                  <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                     disabled={true} value={editableEmployee?.accountNumber || ""}
                    onChange={handleInputChange}
                    className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                  <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                     disabled={true} value={editableEmployee?.ifscCode || ""}
                    onChange={handleInputChange}
                    className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              {/* Authorized Leaves */}
              <div
                className="shadow-md rounded-lg p-4 "
                style={{ backgroundColor: "#a5bdec36" }}
              >
                <h6 className="font-semibold mb-4 text-black text-center uppercase">
                  Authorized Leaves
                </h6>
                <div className="flex flex-col items-start w-full mt-4">
                  <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                    Total Leaves
                  </label>
                  <input
                    type="text"
                    name="totalLeaves"
                     disabled={true} value={editableEmployee?.totalLeaves || "15"}
                    // onChange={handleInputChange}
                    className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                  <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                    Used Leaves
                  </label>
                  <input
                    type="text"
                    name="usedLeaves"
                     disabled={true} value={editableEmployee?.leavestaken || ""}
                    onChange={handleInputChange}
                    className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div
                className="shadow-md rounded-lg p-4 "
                style={{ backgroundColor: "#a5bdec36" }}
              >
                <label className="text-sm font-bold text-black block text-left mb-2">
                  Upload All Documents (pdf)
                </label>
                
                 
                    
                      <div className="mt-2">
                        <a
                          href={ editableEmployee?.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Uploaded PDF
                        </a>
                      </div>
                 
               
              </div>
              ;
            </div>
          </div>

          
        </div>
      </div>)}
    </>
  );
};

export default Profile;
