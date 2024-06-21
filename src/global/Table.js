import React from "react";
import moment from "moment";
import user from "../assets/images/user_3177440.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import DropActions from "./DropActions";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";
const TableFormat = ({ employee, key,onClickEditForm, onClickStatus }) => {
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
   
      <tr style={{ backgroundColor: key % 2 === 0 ? "#ffffff" : "#eff2f9" }}>
        <td className="border px-4 py-2 w-1/3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="w-12 h-12 rounded-full shadow-lg"
                src={employee.image ? employee.image :user}
                alt={employee.name}
              />
            </div>
            <div className="ml-4 items-center  ">
              <div className="text-sm font-medium text-gray-900">
              <NavLink to={`/admin/empdetails?id=${employee._id}`}>   {employee.name}</NavLink>
              </div>
              <div className="text-sm text-gray-500">{employee.email}</div>
            </div>
          </div>
        </td>

        <td className="border px-4 py-2 w-1/3">{employee.position}</td>

        <td className="border px-4 py-2 w-1/3 ">
          {moment(employee.joiningDate).format("YYYY-MM-DD")}
        </td>
        <td className="border px-4 py-2 w-1/3">{employee.phoneNumber}</td>
        <td className={`border px-4 py-2 w-1/3`}><span className={`${statusClass} text-white px-2 py-1 rounded`}>{employee?.status}</span></td>
        <td className="border px-4 py-2 w-1/3">
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
              // { name: "Edit", onClick: onClickEditForm },
              { name: "Status", onClick: onClickStatus },
              { 
                  name: (
                    <CSVLink
                      data={csvData}
                      headers={headers}
                      filename={`${employee.name}_data.csv`}
                    >
                       <button>
                      Export Data
                      </button>
                    </CSVLink>
                  ), 
                  onClick: ()=>console.log("export data")
                },
              ]}
            
          />
        </td>
      </tr>
   
  );
};

export default TableFormat;
