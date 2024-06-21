import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee ,getAllDepartments, getAllPositions, updateEmployee} from "../../Redux/employee";
const EditEmployeeForm = ({ employeeDetail, onCancel ,isemployeeSliceFetchingSmall }) => {
  const {allPositions,allDepartments} = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [employee, setEmployee] = useState({
    _id:"",
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
    dob:'',
    imagePreview: "",
    department:'',
    oldPic:""
  });

  useEffect(() => {
    setEmployee({
      ...employeeDetail,
     imagePreview:employeeDetail.image,
     oldPic:employeeDetail.image,
     department:employeeDetail.departmentId,
     role:employeeDetail.positionId
    });
  }, [employeeDetail]);
 
  useEffect(()=>{
   console.log("empp",employee)
  },[employee])

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
  };
  
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("emp", employee);
    let obj={
      name: employee.name,
      role: employee.role,
      joiningDate: employee.joiningDate,
      address: employee.address,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      gender: employee.gender,
      qualification: employee.qualification,
      bankName: employee.bankName,
      accountNumber: employee.accountNumber,
      ifscCode: employee.ifscCode,
      image: employee.image,
      dob:employee.dob,
      oldPic:employee.oldPic,
     department:employee.department,
    _id:employee._id
    }
    dispatch(updateEmployee(obj));
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
      image: "",
      dob:'',
      imagePreview:"",
    department:'',
    _id:""
    });
    setStep(1);
  };
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
  
  }, [employee.department]);

  

  useEffect(()=>{
   dispatch(getAllDepartments())
  },[])
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit}  encType="multipart/form-data">
          <div className=" flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold mb-3">Edit Employee</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-auto ">
              <div className="flex flex-col mb-5">
                <label htmlFor="name" className="text-sm text-black text-left mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                />
         </div>

              <div className="flex items-center mb-5">
                <div className="">
                  <label htmlFor="image" className="text-sm text-black text-left mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleChange}
                    className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
             </div>
                <div className="">
              
             
                {employee.imagePreview && (
                  <div className="ml-4">
                    <img src={employee.imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                  </div>
                )}
                </div>
                
              </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="dob" className="text-sm text-black text-left mb-1">Date Of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={employee.dob}
                  onChange={handleChange}
                  className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                />
           </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="department" className="text-sm text-black text-left mb-1">Department</label>
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
            </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="role" className="text-sm  text-black text-left mb-1">Role</label>
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
           </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="joiningDate" className="text-sm text-black text-left mb-1">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                  className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                />
           </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="address" className="text-sm text-black text-left mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                  className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                />
         </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="email" className="text-sm text-black text-left mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                />
             </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="phoneNumber" className="text-sm text-black text-left mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={employee.phoneNumber}
                  onChange={handleChange}
                  className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                />
             </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="gender" className="text-sm text-black text-left mb-1">Gender</label>
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
             </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="qualification" className="text-sm text-black text-left mb-1">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={employee.qualification}
                  onChange={handleChange}
                  className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  required
                />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                 
                  onClick={handleNext}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Next
                </button>
              </div>
            
           
              </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center mb-5">
                <label
                  htmlFor="bankName"
                  className="w-1/3 text-sm text-gray-500 pr-3"
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
              </div>
              <div className="flex items-center mb-5">
                <label
                  htmlFor="accountNumber"
                  className="w-1/3 text-sm text-gray-500 pr-3"
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
              </div>
              <div className="flex items-center mb-5">
                <label
                  htmlFor="ifscCode"
                  className="w-1/3 text-sm text-gray-500 pr-3"
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
                  disabled={isemployeeSliceFetchingSmall}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                {isemployeeSliceFetchingSmall ? "...." : 'Submit'}  
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
