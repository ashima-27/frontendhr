import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faTable } from "@fortawesome/free-solid-svg-icons";
import EmployeeForm from "../../Popups/AddEmployee/AddEmployee";
import EditEmployeeForm from "../../Popups/EditEmployee/EditEmployee";
import DefaultPopup from "../../Popups/DefaultPopup/DefaultPopup";
import DashboardMenu from "../../Menu/DashboardMenu/DashboardMenu";
import SideCard from "../../global/SideCard";
import SimpleCard from "../../global/SimpleCard";
import TableFormat from "../../global/Table";
import "react-toastify/dist/ReactToastify.css";
import { 
  clearemployeeSliceStates,
  clearemployeeSliceData, 
  getAllEmployee, 
  makeActiveInactive } from "../../Redux/employee";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import { toast, ToastContainer } from "react-toastify";
import notFound from "../../assets/images/notFound.png";
const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPerPageDrop, setIsPerPageDrop] = useState(false);
  const [perPageDropName, setPerPageDropName] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    allEmployee,
    maleEmployee,
    femaleEmployee,
    newEmployee,
    totalEmployee,
    isemployeeSliceFetching,
    isemployeeAddSuccess,
    isemployeeAddError,
    addEmployeeSuccessMessage,
    addEmployeeErrorMessage,
    employeeSliceErrorMessage,
    isemployeeSliceFetchingSmall ,
    isemployeeSliceError,
  } = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "card" ? "table" : "card"));
  };

  const handleEditForm = (employee) => {
    setSelectedEmployee(employee);
    setEditForm(true);
  };

  const handleStatusChange = (employee) => {
    console.log("emp",employee._id)
    setSelectedEmployee(employee);
    setStatus(true);
  };

  const updateStatus=(emp)=>{
    let obj={
      id:emp._id,
      status:emp.status
    }
    console.log("updtaingg..",obj)
    dispatch(makeActiveInactive(obj))
    setStatus(false);
  }
  const searchHandler = (searchValue) => {
    const keywords = searchValue?.split(",").map((keyword) => keyword.trim());
    setSearchQuery(searchValue);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const onChangePerPage = (obj) => {
    console.log(obj,"object")
    setPerPageDropName(obj.id);
  };

  const loadMore = () => {
    dispatch(
      getAllEmployee({
        perPageCount: perPageDropName,
        pageNumber: currentPage + 1,
        searchValue: searchQuery,
      })

    );
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    let obj = {
      searchValue: searchQuery,
      perPageCount: perPageDropName,
      pageNumber: currentPage,
    };
    console.log("obj", obj);
    dispatch(getAllEmployee(obj));
    return () => {
      dispatch(clearemployeeSliceData());
    };
  }, [searchQuery, perPageDropName]);

  
  const successToast = () => {
    toast.success(addEmployeeSuccessMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000, 
      hideProgressBar: false, 
      pauseOnHover: true, 
    });
  };

  const errorToast = () => {
    toast.error(addEmployeeErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false, 
      pauseOnHover: true, 
    });
  };
  useEffect(() => {
    if (isemployeeAddSuccess) {
      setShowForm(false);
      successToast(); 
    }
    return()=>{
       dispatch(clearemployeeSliceStates())
    }
  }, [isemployeeAddSuccess]);

  useEffect(() => {
    if (isemployeeAddError) {
      setShowForm(false)
      errorToast(); 
    }
    return()=>{
       dispatch(clearemployeeSliceStates())
    }
  }, [isemployeeAddError]);


  useEffect(() => {
    if (isemployeeSliceError) {
      toast.error(employeeSliceErrorMessage, {
        // position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000, 
        hideProgressBar: false, 
        pauseOnHover: true, 
      });
    }
    return()=>{
      // dispatch(clearBlogSliceStates())
    }
  }, [isemployeeSliceError]);


  return (

    // <div className="container m-auto py-5 h-auto">
    <div className="p-6 flex justify-center items-center w-full mx-auto ">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-11/12 justify-center items-center mx-auto ">
        
      <ToastContainer />
    {isemployeeSliceFetching && <ComponentLoader />}
      {showForm && <EmployeeForm onCancel={() => setShowForm(false)} />}
      {editForm && (
        <EditEmployeeForm
          onCancel={() => setEditForm(false)}
          employeeDetail={selectedEmployee}
          isemployeeSliceFetchingSmall ={isemployeeSliceFetchingSmall }
        />
      )}
      {status && (
        <DefaultPopup
          onYes={()=>updateStatus(selectedEmployee)}
          onCancel={() => setStatus(false)}
          desc={"Do You want to change the status Of Employee"}
          title={"Change Status"}
        />
      )}
      <div className="flex flex-col w-full gap-4 m-4 md:grid md:grid-cols-2 lg:grid-cols-4 mx-auto">
        <SideCard
          desc={"Total Employees"}
          count={totalEmployee}
          backgroundColor="#f5bbc545"
        />
        <SideCard
          desc={"New Employees"}
          count={newEmployee}
          backgroundColor="#add8e67d"
        />
        <SideCard
          desc={"Male Employees"}
          count={maleEmployee}
          backgroundColor="#90ee9066"
        />
        <SideCard
          desc={"Female Employees"}
          count={femaleEmployee}
          backgroundColor="#f0808052"
        />
      </div>
      <DashboardMenu
        employee={allEmployee}
        searchFunction={searchHandler}
        clearSearch={clearSearch}
        buttonName={"Add "}
        onClickAddEmployee={() => setShowForm(true)}
        onClickDownloadEmployee={() => console.log("download")}
        buttonName1={"Download"}
        buttonName2={
          <FontAwesomeIcon
            size="2xl"
            icon={viewMode === "card" ? faTable : faTh}
            className="mr-1"
          />
        }
        onClickToggle={toggleViewMode}
        options={[
          { name: "10", id: 10 },
          { name: "20", id: 20 },
          { name: "30", id: 30 },
          { name: "Max", id: totalEmployee },
        ]}
        isActive={isPerPageDrop}
        setIsActive={setIsPerPageDrop}
        onSelect={onChangePerPage}
        dropName={perPageDropName}
        isCsv={true}
      />
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {allEmployee?.map((employee, index) => (
            <SimpleCard
              key={index}
              employee={employee}
              onClickEditForm={() => handleEditForm(employee)}
              onClickStatus={() => handleStatusChange(employee)}
             
            />
          ))}
          {allEmployee.length === 0 &&
          <div className="">
          <img src={notFound} alt="notFound" className="w-20 h-20"/>
          </div>
          }
        </div>
      ) : (
        <div className="overflow-scroll hide-scrollbar">
          <table className="table-auto w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2  ">Name</th>
                <th className="px-2 py-2  ">Employee Id</th>
                <th className="px-4 py-2  ">Role</th>
                <th className="px-4 py-2  ">Joining Date</th>
                <th className="px-4 py-2  ">Phone Number</th>
                <th className="px-4 py-2  ">Status</th>
                <th className="px-4 py-2  ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allEmployee?.map((employee, index) => (
                <TableFormat
                  key={index}
                  employee={employee}
                  onClickEditForm={() => handleEditForm(employee)}
                  onClickStatus={() => handleStatusChange(employee)}
                />
              ))}
             
            </tbody>
          </table>
          {allEmployee.length === 0 && (
              <div className="flex flex-col w-full gap-2 justify-center items-center min-h-screen ">
          <img src={notFound} alt="notFound" className="w-50 h-auto"/>
          <p className='text-md m-0 p-0 font-semibold'>Data Not Found !</p>
          </div>
        )}
        </div>
      )}
      {allEmployee?.length !== totalEmployee && !isemployeeSliceFetching && (
      <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block  bg-blue-500 text-gray-500 dark:text-white-400 hover:bg-blue-100 dark:hover:bg-gray-700  focus:outline-none dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            onClick={()=>loadMore()}
          >Load More</button>
          )}
    </div>
      </div>
  );
};

export default AdminDashboard;
