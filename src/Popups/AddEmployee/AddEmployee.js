import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCloudinaryUpload from "../../customHook/useCloudinaryHook";
import {
  addEmployee,
  clearAllDepartments,
  clearAllPositions,
  getAllDepartments,
  getAllPositions,
  getAllProjects,
  clearAllProjects,
} from "../../Redux/employee";
const EmployeeForm = ({ onCancel }) => {
  const { allPositions, allProjects, allDepartments } = useSelector(
    (state) => state.employee
  );
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);

  const { uploading, error, url, uploadPdf } = useCloudinaryUpload();
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    joiningDate: "",
    address: "",
    email: "",
    phoneNumber: "",
    gender: "",
    qualification: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    image: "",
    dob: "",
    department: "",
    imagePreview: "",
    salary: "",
    shift: "",
    project: "",
    documentUrl: "",
    permission:"",
    password:""
  });
  const [errors, setErrors] = useState({
    name: "",
    role: "",
    joiningDate: "",
    address: "",
    email: "",
    phoneNumber: "",
    gender: "",
    qualification: "",
    bankName: "",
    accountNumber: "",
    image: "",
    ifscCode: "",
    dob: "",
    department: "",
    salary: "",
    shift: "",
    project: "",
    documentUrl: "",
    permission:"",
    password:""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setEmployee({
        ...employee,
        [name]: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    console.log("url", url);
    if (url) {
      setEmployee((prevEditableEmployee) => ({
        ...prevEditableEmployee,
        documentUrl: url,
      }));
    }
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("emp", employee);

      dispatch(addEmployee(employee));
      setEmployee({
        name: "",
        role: "",
        joiningDate: "",
        address: "",
        email: "",
        phoneNumber: "",
        gender: "",
        qualification: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        image: null,
        imagePreview: "",
        dob: "",
        salary: "",
        shift: "",
        project: "",
        documentUrl: "",
        permission:"",
        password:""
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!employee.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!employee.image) {
      errors.name = "Image is required";
      isValid = false;
    }
    if (!employee.dob.trim()) {
      errors.name = "DOB is required";
      isValid = false;
    }

    if (!employee.role.trim()) {
      errors.role = "Role is required";
      isValid = false;
    }

    if (!employee.joiningDate.trim()) {
      errors.joiningDate = "Joining date is required";
      isValid = false;
    }

    if (!employee.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!employee.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(employee.email.trim())) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // if (!employee.phoneNumber.trim()) {
    //   errors.phoneNumber = 'Phone number is required';
    //   isValid = false;
    // } else if (!isValidPhoneNumber(employee.phoneNumber.trim())) {
    //   errors.phoneNumber = 'Invalid phone number format';
    //   isValid = false;
    // }

    if (!employee.gender.trim()) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    if (!employee.qualification.trim()) {
      errors.qualification = "Qualification is required";
      isValid = false;
    }

    if (!employee.bankName.trim()) {
      errors.bankName = "Bank name is required";
      isValid = false;
    }

    if (!employee.accountNumber.trim()) {
      errors.accountNumber = "Account number is required";
      isValid = false;
    }

    if (!employee.ifscCode.trim()) {
      errors.ifscCode = "IFSC code is required";
      isValid = false;
    }
    // if (!isValidPhoneNumber(employee.phoneNumber.trim())) {
    //   errors['phoneNumber'] = 'Invalid phone number format';
    //   isValid = false;
    // }

    if (!isValidEmail(employee.email.trim())) {
      errors["email"] = "Invalid email format";
      isValid = false;
    }

    if (!isValidBankNumber(employee.accountNumber.trim())) {
      errors["accountNumber"] = "Invalid bank account number format";
      isValid = false;
    }

    if (!isValidIFSCCode(employee.ifscCode.trim())) {
      errors["ifscCode"] = "Invalid IFSC code format";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const isValidPhoneNumber = (phoneNumber) => {
  //   const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  //   return phoneRegex.test(phoneNumber);
  // };

  const isValidBankNumber = (bankNumber) => {
    const numericRegex = /^\d+$/;
    const length = 10;

    return numericRegex.test(bankNumber) && bankNumber.length === length;
    return true;
  };

  const isValidIFSCCode = (ifscCode) => {
    // Add your validation logic for IFSC code format
    const ifscRegex = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;

    // Check if the provided IFSC code matches the pattern
    return ifscRegex.test(ifscCode);
  };
  const isFormValid = () => {
    return (
      employee.name.trim() &&
      employee.role.trim() &&
      employee.joiningDate.trim() &&
      employee.address.trim() &&
      employee.email.trim() &&
      employee.phoneNumber.trim() &&
      employee.gender.trim() &&
      employee.qualification.trim() &&
      employee.dob.trim() &&
      employee.image
    );
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
    console.log("Emp", employee);
  }, [employee]);

  useEffect(() => {
    if (employee.department) {
      const obj = {
        departmentId: employee.department,
      };
      dispatch(getAllPositions(obj));
    }
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      role: employee.department ? prevEmployee.role : "",
    }));

    return () => {
      dispatch(clearAllPositions());
    };
  }, [employee.department]);
  useEffect(() => {
    dispatch(getAllProjects());
    return () => {
      dispatch(clearAllProjects());
    };
  }, []);
  useEffect(() => {
    dispatch(getAllDepartments());
    return () => {
      dispatch(clearAllDepartments());
    };
  }, []);
  useEffect(() => {
    const generatePassword = (name) => {
      const nameParts = name.split(" ");
      const filteredParts = nameParts.map(part => part.substring(0, 3));
      return filteredParts.join('') + "123";
    };

    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      password: generatePassword(prevEmployee.name)
    }));
  }, [employee.name]);
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg m-5">
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className=" flex justify-between items-center mb-auto">
              <h3 className="text-xl font-semibold mb-3">Add New Employee</h3>
              <button
                onClick={onCancel}
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
            </div>
            {step === 1 && (
              <>
                <h5 className="font-bold p-2 text-md ">Personal Details</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-auto ">
                  <div className="flex items-center mb-auto">
                    <div className="">
                      <label
                        htmlFor="image"
                        className="text-sm text-black text-left mb-1"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                        className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                        required
                      />
                      {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.image}
                        </p>
                      )}
                    </div>
                    <div className="">
                      {employee.imagePreview && (
                        <div className="ml-4">
                          <img
                            src={employee.imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="name"
                      className="text-sm text-black text-left mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={employee.name}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="dob"
                      className="text-sm text-black text-left mb-1"
                    >
                      Date Of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={employee.dob}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="email"
                      className="text-sm text-black text-left mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={employee.email}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="phoneNumber"
                      className="text-sm text-black text-left mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={employee.phoneNumber}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      required
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="gender"
                      className="text-sm text-black text-left mb-1"
                    >
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={employee.gender}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="address"
                      className="text-sm text-black text-left mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={employee.address}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="password"
                      className="text-sm text-black text-left mb-1"
                    >
                     Password
                    </label>
                    <input
                      type="text"
                      name="password"
                      disabled={true}
                      value={employee.password}
                      onChange={handleChange}
                   
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    // disabled={!isFormValid()}
                    onClick={handleNext}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Next
                  </button>
                </div>{" "}
              </>
            )}
            {/* step 2 */}
            {step === 2 && (
              <>
                <h5 className="font-bold p-2 text-md ">Job Details</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-auto ">
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="department"
                      className="text-sm text-black text-left mb-1"
                    >
                      Department
                    </label>
                    <select
                      name="department"
                      value={employee.department}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    >
                      <option value="">Select Department</option>
                      {allDepartments.map((position) => (
                        <option key={position._id} value={position._id}>
                          {position.departmentName}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.department}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="permission"
                      className="text-sm  text-black text-left mb-1"
                    >
                      Permission
                    </label>
                    <select
                      name="permission"
                      value={employee.permission}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    >
                      <option value="">Select permission</option>
                  
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                  
                    </select>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="role"
                      className="text-sm  text-black text-left mb-1"
                    >
                      Role
                    </label>
                    <select
                      name="role"
                      value={employee.role}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    >
                      <option value="">Select Position</option>
                      {allPositions.map((position) => (
                        <option key={position._id} value={position._id}>
                          {position.title}
                        </option>
                      ))}
                    </select>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
                  </div>

                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="project"
                      className="text-sm  text-black text-left mb-1"
                    >
                      Project
                    </label>
                    <select
                      name="project"
                      value={employee.project}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    >
                      <option value="">Select Project</option>
                      {allProjects.map((position) => (
                        <option key={position._id} value={position._id}>
                          {position.projectName}
                        </option>
                      ))}
                    </select>
                    {errors.project && (
                      <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="joiningDate"
                      className="text-sm text-black text-left mb-1"
                    >
                      Joining Date
                    </label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={employee.joiningDate}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.joiningDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.joiningDate}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="shift"
                      className="text-sm text-black text-left mb-1"
                    >
                      Shift
                    </label>
                    <select
                      name="shift"
                      value={employee.shift}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    >
                      <option value="">Select Shift</option>
                      <option key="Hybrid" value="Hybrid">
                        Hybrid
                      </option>
                      <option key="Onsite" value="Onsite">
                        Onsite
                      </option>
                      <option value="Remote">Remote</option>
                    </select>

                    {errors.shift && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shift}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="qualification"
                      className="text-sm text-black text-left mb-1"
                    >
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={employee.qualification}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.qualification && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.qualification}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="salary"
                      className="text-sm text-black text-left mb-1"
                    >
                      Salary
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={employee.salary}
                      onChange={handleChange}
                      className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.salary && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.salary}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-auto">
                    <label
                      htmlFor="document"
                      className="text-sm text-black text-left mb-1"
                    >
                      Upload Documents
                    </label>
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
                    {(url || employee?.documentUrl) && (
                      <div className="mt-2">
                        <a
                          href={url || employee?.documentUrl}
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
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    next
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h5 className="font-bold p-2 text-md ">Bank Details</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-auto ">
                  <div className="flex items-center mb-auto">
                    <label
                      htmlFor="bankName"
                      className="w-1/3 text-sm text-black text-left pr-3"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={employee.bankName}
                      onChange={handleChange}
                      className="w-2/3 py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.bankName && (
                      <p className="text-red-500 text-sm">{errors.bankName}</p>
                    )}
                  </div>
                  <div className="flex items-center mb-auto">
                    <label
                      htmlFor="accountNumber"
                      className="w-1/3 text-sm text-black text-left pr-3"
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={employee.accountNumber}
                      onChange={handleChange}
                      className="w-2/3 py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.accountNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.accountNumber}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center mb-auto">
                    <label
                      htmlFor="ifscCode"
                      className="w-1/3 text-sm text-black text-left pr-3"
                    >
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={employee.ifscCode}
                      onChange={handleChange}
                      className="w-2/3 py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    />
                    {errors.ifscCode && (
                      <p className="text-red-500 text-sm">{errors.ifscCode}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
