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
  getEmployeeById,
  getAllDepartments,
  getAllPositions,
  getAllProjects,
  updateEmployee,
  clearAllProjects,
  clearAllDepartments,
  clearAllPositions,
  clearEmployeeByIdData,
  clearemployeeSliceStates
} from "../../Redux/employee";
import { useLocation, useNavigate } from "react-router-dom";
const EmployeeDetails = () => {
  const { employee, allProjects, allPositions, allDepartments ,isemployeeByIdSliceFetching,isemployeeByIdSliceError,isemployeeByIdSliceSuccess,isemployeeSliceFetchingSmall,employeeByIdSliceSuccessMessage,employeeByIdSliceErrorMessage} = useSelector(
    (state) => state.employee
  );
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [editableEmployee, setEditableEmployee] = useState({});
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [file, setFile] = useState(null);
  const [img, setImage] = useState(null);
  const {
    uploading,
    error,
    url,
    uploadPdf,
    uploadImage,
    imgError,
    imageUploading,
    imageUrl,
  } = useCloudinaryUpload();

  useEffect(() => {
    console.log("url", url);
    if (url) {
      setEditableEmployee((prevEditableEmployee) => ({
        ...prevEditableEmployee,
        documentUrl: url,
      }));
    }
  }, [url]);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  // Define a function to handle image upload
  const handleImageUpload = () => {
    uploadImage(img).then(() => {
      console.log("Image uploaded successfully");
    });
  };
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    uploadPdf(file).then(() => {
      console.log("url", url);
    });
  };
  useEffect(() => {
    if (imageUrl) {
      setEditableEmployee((prevEditableEmployee) => ({
        ...prevEditableEmployee,
        image: imageUrl,
      }));
    }
  }, [imageUrl]);
  useEffect(() => {
    if (id) {
      dispatch(getEmployeeById({ id }));
    }
    return(()=>{
      dispatch(clearEmployeeByIdData())
    })
  }, [id, dispatch]);

  useEffect(() => {
    if (employee) {
      setEditableEmployee({
        ...employee,
        dob: moment(employee?.dob).format("YYYY-MM-DD"),
        shift: employee?.shift,
        documentUrl: employee?.documentUrl,
      });
    }
    console.log(employee);
  }, [employee]);

  const successToast = () => {
    toast.success(employeeByIdSliceSuccessMessage, {
      autoClose: 3000, 
      hideProgressBar: false, 
      pauseOnHover: true, 
    });
  };

  const errorToast = () => {
    toast.error(employeeByIdSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true, 
    });
  };
  useEffect(() => {
    if (isemployeeByIdSliceSuccess) {
    
      successToast(); 
    }
    return()=>{
       dispatch(clearemployeeSliceStates())
    }
  }, [isemployeeByIdSliceSuccess]);

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

  const handleSave = () => {
    console.log("dobee", editableEmployee);
    dispatch(updateEmployee(editableEmployee));
   
  };
  useEffect(() => {
    if (editableEmployee.departmentId) {
      const obj = {
        departmentId: editableEmployee.departmentId,
      };
      dispatch(getAllPositions(obj));
    }

    setEditableEmployee((prevEmployee) => ({
      ...prevEmployee,
      role: editableEmployee.departmentId ? prevEmployee.role : "",
      highSalary: allPositions.highSalary,
      lowSalary: allPositions.lowSalary,
    }));
    return(()=>{
      dispatch(clearAllPositions())
    })
  }, [editableEmployee.departmentId, allDepartments]);

  useEffect(() => {
    if (editableEmployee.departmentId && allPositions.length > 0) {
      const selectedPosition = allPositions.find(
        (position) => position._id === editableEmployee.positionId
      );

      setEditableEmployee((prevEmployee) => ({
        ...prevEmployee,

        highSalary: selectedPosition ? selectedPosition.highSalary : "",
        lowSalary: selectedPosition ? selectedPosition.lowSalary : "",
      }));
    }
  }, [
    editableEmployee.departmentId,
    editableEmployee.positionId,
    allPositions,
  ]);

  useEffect(() => {
    dispatch(getAllDepartments());
    return(()=>{
      dispatch(clearAllDepartments())
    })
  }, []);

  useEffect(() => {
    dispatch(getAllProjects());
    return (()=>{
      dispatch(clearAllProjects())
    })
  }, []);

  return (
    <>
       <ToastContainer />
    {isemployeeByIdSliceFetching && <ComponentLoader />}
      <div className="s p-6 flex justify-center items-start space-y-8">
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="py-2 w-full px-3 bg-white text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleImageUpload}
                  disabled={!img || imageUploading}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {imageUploading ? "Uploading..." : "Upload Image"}
                </button>
                {imgError && (
                  <div className="mt-2 text-red-600">{imgError}</div>
                )}

                <div className="text-center w-full">
                  {/* <h6 className="font-semibold mb-4 text-black uppercase">EMPLOYEE'S PERSONAL INFORMATION</h6> */}
                  <div className="flex flex-col items-start w-full mt-4">
                    <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
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
                      value={editableEmployee?.email || ""}
                      onChange={handleInputChange}
                      className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    />
                    <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
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
                  name="departmentId"
                  value={editableEmployee.departmentId}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">Select Department</option>

                  {allDepartments.map((position) => (
                    <option key={position._id} value={position._id}>
                      {position.departmentName}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="role"
                  className="text-sm  font-bold  text-black block text-left m-1 p-1"
                >
                  Role
                </label>
                <select
                  name="positionId"
                  value={editableEmployee.positionId}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">Select Position</option>
                  {allPositions.map((position) => (
                    <option key={position._id} value={position._id}>
                      {position.title}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="project"
                  className="text-sm  font-bold  text-black block text-left m-1 p-1"
                >
                  Project Working On
                </label>
                <select
                  name="projectId"
                  value={editableEmployee.projectId}
                  onChange={handleInputChange}
                  className="py-2 px-3 w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">Select Project</option>
                  {allProjects.map((position) => (
                    <option key={position._id} value={position._id}>
                      {position.projectName}
                    </option>
                  ))}
                </select>

                <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
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
                  value={editableEmployee?.qualification || ""}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />
                <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                  Salary ({editableEmployee?.highSalary} -
                  {editableEmployee?.lowSalary})
                </label>
                <input
                  type="text"
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
                  value={editableEmployee?.shift || ""}
                  onChange={handleInputChange}
                  className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                >
                  <option key="Hybrid" value="Hybrid">
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
                    value={editableEmployee?.bankName || ""}
                    onChange={handleInputChange}
                    className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                  <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={editableEmployee?.accountNumber || ""}
                    onChange={handleInputChange}
                    className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                  <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={editableEmployee?.ifscCode || ""}
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
                    value={editableEmployee?.totalLeaves || "15"}
                    // onChange={handleInputChange}
                    className="py-2 w-full px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                  <label className="text-sm  font-bold  text-black block text-left m-1 p-1">
                    Used Leaves
                  </label>
                  <input
                    type="text"
                    name="usedLeaves"
                    value={editableEmployee?.leavestaken || ""}
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
                {editableEmployee.documentUrl ? (
                  <>
                    <button
                      onClick={() => setShowUploadInput(true)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Upload New PDF
                    </button>
                    {showUploadInput && (
                      <div
                        className="shadow-md rounded-lg p-4"
                        style={{ backgroundColor: "#a5bdec36" }}
                      >
                        <input
                          name="documentUrl"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="py-2 w-full px-3 bg-white text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                        />
                        <button
                          onClick={handleUpload}
                          disabled={uploading}
                          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                          {uploading ? "Uploading..." : "Upload PDF"}
                        </button>
                        {error && (
                          <div className="mt-2 text-red-600">{error}</div>
                        )}
                      </div>
                    )}
                    {(url || editableEmployee?.documentUrl) && (
                      <div className="mt-2">
                        <a
                          href={url || editableEmployee?.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Uploaded PDF
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      name="documentUrl"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="py-2 w-full px-3 bg-white text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    />
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      {uploading ? "Uploading..." : "Upload PDF"}
                    </button>
                    {error && <div className="mt-2 text-red-600">{error}</div>}
                  </>
                )}
              </div>
              ;
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white py-2 px-4 w-full rounded"
          >
       {isemployeeSliceFetchingSmall ? '...' : 'Save'}     
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
