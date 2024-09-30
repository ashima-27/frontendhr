import React, { useState, useCallback, useEffect } from "react";
import Dropdown from "../../global/Dropdown";
import { CSVLink } from "react-csv";
import debounce from "lodash.debounce"; // Add lodash.debounce for debounce functionality
import Cookies from "js-cookie";
const Menu = ({
  searchFunction,
  clearSearch,
  buttonName,
  buttonName2,
  onClickToggle,
  onClickAddEmployee,
  onClickDownloadEmployee,
  employee,
  options,
  onSelect,
  setIsActive,
  isActive,
  dropName,
  isCsv,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log("Debounced Search Value:", value);
      searchFunction(value);
    }, 800),
    []
  );

  const handleSearchChange = (e) => {
    console.log("Search Value:", e.target.value);
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    console.log("Key Pressed:", e.key);
    if (e.key === "Enter") {
      debouncedSearch.cancel();
      searchFunction(searchValue);
    }
  };

  const headersOfEmployee = [
    { label: "Name", key: "name" },
    { label: "Role", key: "role" },
    { label: "Joining Date", key: "joiningDate" },
    { label: "Address", key: "address" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Gender", key: "gender" },
    { label: "Qualification", key: "qualification" },
    { label: "Bank Name", key: "bankName" },
    { label: "Account Number", key: "accountNumber" },
    { label: "IFSC Code", key: "ifscCode" },
  ];
  useEffect(() => {
    const roles = Cookies.get("role");
    if (roles) {
      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("admin"));
    }
  }, [Cookies.get("role")]);

  return (
    <header className="p-4 w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-row items-center w-full md:w-4/12">
          <form className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border
              border-gray-300 rounded-lg bg-gray-50 
              dark:bg-gray-700 dark:border-gray-600 focus:outline-none
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500"
                placeholder="Search ..."
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              {searchValue.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    clearSearch();
                  }}
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  close
                </button>
              )}
            </div>
          </form>
          
        </div>

        <div className="flex flex-col sm:flex-row  justify-end md:justify-end items-end gap-2 w-full md:w-8/12">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-6/12 justify-center md:justify-end items-center">
          {isAdmin && (
            <div className="w-full sm:w-6/12 flex md:justify-end justify-center ">
            <button
              onClick={onClickAddEmployee}
              type="button"
              className="text-white  bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {buttonName}
            </button>
            </div>
          )}
          {isCsv && (
            <div className="w-full sm:w-6/12">
            <CSVLink
              className="downloadCSV"
              data={employee.map((data) => ({ ...data }))}
              headers={headersOfEmployee}
              filename="Employee Data"
            >
              <button
                onClick={onClickDownloadEmployee}
                type="button"
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Download
              </button>
            </CSVLink>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2 w-full  md:w-6/12 justify-center items-center">
        <Dropdown
            options={options}
            onSelect={onSelect}
            setIsActive={setIsActive}
            isActive={isActive}
            dropName={dropName}
          />
          <button
            onClick={onClickToggle}
            type="button"
            className="text-black bg-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {buttonName2}
          </button>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Menu;
