import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearnotificationData, getAllNotifications,clearticketSliceStates } from '../../Redux/ticket';
import Menu from '../../Menu/NotificationMenu/NotificationMenu';
import Pagination from '../../global/Pagination';
import moment from 'moment';
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
const NotificationsDashboard = () => {
  const dispatch = useDispatch();
  const { notifications, status, error, totalnotification ,isticketSliceFetching,ticketSliceErrorMessage,ticketSliceSuccessMessage,isticketSliceError,isticketSliceSuccess} = useSelector((state) => state.ticket);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPerPageDrop, setIsPerPageDrop] = useState(false);
  const [perPageDropName, setPerPageDropName] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().endOf('month').format('YYYY-MM-DD'));
  const roles = Cookies.get("role");

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
  
    console.log("roles",roles) 
    if(roles){
      console.log("hj",roles?true:false)
      let tempRole = JSON.parse(roles)
      setIsAdmin(tempRole?.includes('admin') )
    }
    
    
  }, [roles]);
  useEffect(() => {
    const fetchNotifications = async () => {
      let obj = {
        searchValue: searchQuery,
        perPageCount: perPageDropName,
        pageNumber: currentPage,
        fromDate: startDate,
        toDate: endDate,
      };
      console.log("obj", obj);
       dispatch(getAllNotifications(obj));
    };

    fetchNotifications();

    return () => {
      dispatch(clearnotificationData());
    };
  }, [dispatch, searchQuery, perPageDropName, currentPage,startDate,endDate]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalnotification / perPageDropName)); 
  }, [totalnotification, perPageDropName]);

  const searchHandler = (searchValue) => {
    setSearchQuery(searchValue);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const onChangePerPage = (obj) => {
    setPerPageDropName(obj.id);
    setCurrentPage(1);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const successToast = () => {
    toast.success(ticketSliceSuccessMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000, 
      hideProgressBar: false, 
      pauseOnHover: true, 
    });
  };

  const errorToast = () => {
    toast.error(ticketSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false, 
      pauseOnHover: true, 
    });
  };
  useEffect(() => {
    if (isticketSliceSuccess) {
      
      successToast(); 
    }
    return()=>{
       dispatch(clearticketSliceStates())
    }
  }, [isticketSliceSuccess]);

  useEffect(() => {
    if (isticketSliceError) {
      errorToast(); 
    }
    return()=>{
       dispatch(clearticketSliceStates())
    }
  }, [isticketSliceError]);
  const renderNotifications = () => {
 

    return (
      
      <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-wrap">
  {notifications?.map((notification, index) => (
    <div className="w-full md:w-1/2 p-2" key={index}>
      <ol className="relative border-l border-gray-200 dark:border-gray-700" style={{backgroundColor:'#eff2f9'}}>
        <li className="mb-4 ml-6 p-4">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg
              className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-500">Released on December 7th, 2021</time>
          <p className="text-base font-normal text-gray-900 dark:text-gray-400">{notification.body}</p>
        </li>
      </ol>
    </div>
  ))}
</div>

      </div>
    );
  };

  return (
    
    <><ToastContainer/>
    {isticketSliceFetching && <ComponentLoader/>}
     <div className="mx-auto p-4 bg-white shadow-md rounded-lg"  style={{backgroundColor:'#eff2f9'}}>
     
     <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg">
    <Menu   options={[
      { name: "10", id: 10 },
      { name: "20", id: 20 },
      { name: "30", id: 30 },
      { name: "Max", id: totalnotification },
    ]}
    searchFunction={searchHandler}
    clearSearch={clearSearch}
    isActive={isPerPageDrop}
    setIsActive={setIsPerPageDrop}
    onSelect={onChangePerPage}
    dropName={perPageDropName}  
    startDate={startDate}
    showing={notifications.length}
    total={totalnotification}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate} 
            
            isCreate={isAdmin ? true : false }
          isCreateLink={"/admin/sendNoti"}
          isCreateName={"Send Notifications"}
              />
   </div>
      {renderNotifications()}
      <div className="max-w-7xl mx-auto p-4 m-4 mb-6 bg-white shadow-md rounded-lg flex  justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
    </div>
   
    </>
  );
};

export default NotificationsDashboard;
