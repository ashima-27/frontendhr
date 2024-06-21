import React from "react";
import moment from "moment";
import user from "../assets/images/user_3177440.png"; // Update the path accordingly
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import DropActions from "./DropActions";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";
const SimpleCard = ({ employee, onClickEditForm, onClickStatus }) => {
  console.log("employee" ,employee)
  const statusClass =
    employee.status === "Active" ? "bg-green-300" : "bg-red-300";
    const headers = [
      { label: "Account Number", key: "accountNumber" },
      { label: "Address", key: "address" },
      { label: "Bank Name", key: "bankName" },
      { label: "Department", key: "department" },
      { label: "Date of Birth", key: "dob" },
      { label: "Email", key: "email" },
      { label: "Gender", key: "gender" },
      { label: "IFSC Code", key: "ifscCode" },
      { label: "Joining Date", key: "joiningDate" },
      { label: "Name", key: "name" },
      { label: "Phone Number", key: "phoneNumber" },
      { label: "Position", key: "position" },
      { label: "Qualification", key: "qualification" },
      { label: "Shift", key: "shift" },
      { label: "Status", key: "status" },
    ];
  
    const csvData = [
      {
        accountNumber: employee.accountNumber,
        address: employee.address,
        bankName: employee.bankName,
        department: employee.department,
        dob: moment(employee.dob).format("YYYY-MM-DD"),
        email: employee.email,
        gender: employee.gender,
        ifscCode: employee.ifscCode,
        joiningDate: moment(employee.joiningDate).format("YYYY-MM-DD"),
        name: employee.name,
        phoneNumber: employee.phoneNumber,
        position: employee.position,
        qualification: employee.qualification,
        shift: employee.shift,
        status: employee.status,
      }
    ];
 

  return (
    <div
      style={{ backgroundColor: "#bdccd826" }}
      className="w-full m-2 max-w-sm bg-white border p-2 rounded-lg  dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out "
    >
      <div className="flex justify-between items-center">
        <div
          className={`flex justify-start ${statusClass} text-white px-2 py-1 rounded`}
        >
          {employee.status}
        </div>
        <div className="flex justify-end px-2 py-1">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>

            <DropActions
              heading={
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              }
              options={[
                { name: "Edit", onClick: onClickEditForm },
                { name: "Status", onClick: onClickStatus },
                { 
                  name: (
                    <div>
                    <CSVLink
                  
                      data={csvData}
                      headers={headers}
                      filename={`${employee.name}_data.csv`}
                    >
                    <button>
                      Export Data
                      </button>
                    </CSVLink>
                    </div>
                  ), 
                  onClick: ()=>console.log("export data")
                },
              ]}
              
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={employee.image ? employee.image :user}
          alt={employee.name}
        />
     <NavLink to={`/admin/empdetails?id=${employee._id}`}>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {employee.name}
          </h5>
        </NavLink>
        <span className="text-sm text-gray-500 dark:text-gray-400 rounded-full bg-gray-200 px-2 py-1">
          {employee.position}
        </span>
        <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 dark:text-gray-400 pt-1">
          <p>
            <strong>Employee Id:</strong>{" "}
            {moment(employee.joiningDate).format("YYYY-MM-DD")}
          </p>
          <p>
            <strong>Joining Date:</strong>{" "}
            {moment(employee.joiningDate).format("YYYY-MM-DD")}
          </p>
        </div>
        <div className="flex mt-4 md:mt-6 space-x-3">
          <div className="flex items-center space-x-2">
            <a
              href={`tel:${employee.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faPhone}
                className="text-blue-500 bg-gray-200 p-2 rounded-full border border-gray-300"
              />{" "}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={`mailto:${employee.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-blue-500 bg-gray-200 p-2 rounded-full border border-gray-300"
              />
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={`https://wa.me/${employee.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-blue-500 bg-gray-200 p-2 rounded-full border border-gray-300"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCard;
