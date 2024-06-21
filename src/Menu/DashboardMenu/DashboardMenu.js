import React, { useState, useCallback } from "react";
import Dropdown from "../../global/Dropdown";
import { CSVLink } from 'react-csv';
import debounce from 'lodash.debounce'; // Add lodash.debounce for debounce functionality

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
  isCsv
}) => {
  const [searchValue, setSearchValue] = useState("");

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
    { label: 'Name', key: 'name' },
    { label: 'Role', key: 'role' },
    { label: 'Joining Date', key: 'joiningDate' },
    { label: 'Address', key: 'address' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Gender', key: 'gender' },
    { label: 'Qualification', key: 'qualification' },
    { label: 'Bank Name', key: 'bankName' },
    { label: 'Account Number', key: 'accountNumber' },
    { label: 'IFSC Code', key: 'ifscCode' }
  ];

  return (
    <header className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <div className="lg:col-span-2 lg:order-1">
          <form className="max-w-md mx-auto lg:ml-0">
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
              border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
              focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500"
                placeholder="Search Employee..."
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
        <div className="flex justify-end lg:order-2">
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
            className="text-black bg-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {buttonName2}
          </button>
          <button
            onClick={onClickAddEmployee}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {buttonName}
          </button>
          {isCsv &&(
          <CSVLink 
            className='downloadCSV' 
            data={employee.map((data) => ({ ...data }))}
            headers={headersOfEmployee} 
            filename='Employee Data'
          >
            <button
              onClick={onClickDownloadEmployee}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Download
            </button>
          </CSVLink>
        )}
        </div>
      </div>
    </header>
  );
};

export default Menu;
