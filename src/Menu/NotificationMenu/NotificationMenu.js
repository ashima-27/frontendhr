import React, { useState, useCallback ,useEffect} from "react";
import Dropdown from "../../global/Dropdown";
import debounce from "lodash.debounce"; // Add lodash.debounce for debounce functionality
import moment from "moment";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
const Menu = ({
  searchFunction,
  clearSearch,
  options,
  onSelect,
  setIsActive,
  isActive,
  dropName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  showing,
  total,
  isCreate,
  isCreateLink,
   isCreateName
}) => {
  const [searchValue, setSearchValue] = useState("");
  const roles = Cookies.get("role");
  const navigate= useNavigate()
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
  useEffect(() => {
  
    console.log("roles",roles) 
    if(roles){
      console.log("hj",roles?true:false)
      let tempRole = JSON.parse(roles)
      setIsAdmin(tempRole?.includes('admin') )
    }
    
    
  }, [roles]);
  return (
  <header className="">
    <div className="flex flex-col lg:flex-row items-center lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4">
      <form className="flex-grow w-full lg:w-auto">
        <div className="relative w-full">
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              Close
            </button>
          )}
        </div>
      </form>
  
      <div className="flex flex-row items-center justify-center w-full lg:w-auto space-x-4">
        <h6 className="text-center  w-auto">
          Showing {showing} out of {total || "0"}
        </h6>
        <Dropdown
          options={options}
          onSelect={onSelect}
          setIsActive={setIsActive}
          isActive={isActive}
          dropName={dropName}
        />
      </div>
  
      <form className="flex flex-col w-full lg:flex-row lg:items-center lg:w-auto">
        <div className="flex flex-col w-full lg:flex-row lg:items-center lg:w-auto">
          <div className="flex flex-col sm:flex-row sm:space-x-4 lg:mr-4 mb-2 lg:mb-0">
            <div className="flex flex-col w-full">
              {/* <label htmlFor="sd" className="text-sm text-black mb-1">
                Start Date
              </label> */}
              <input
                type="date"
                name="sd"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full mt-2 sm:mt-0">
              {/* <label htmlFor="ld" className="text-sm text-black mb-1">
                End Date
              </label> */}
              <input
                type="date"
                name="ld"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 w-full"
                required
              />
            </div>
          </div>
  
          {isCreate && (
            <div className="mt-4 lg:mt-0 lg:ml-4">
             
                <button
                  type="button"
                  onClick={()=>navigate("/raiseTicket")}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isCreateName}
                </button>
              
            </div>
          )}
        </div>
      </form>
    </div>
  </header>
  

  
  );
};

export default Menu;
