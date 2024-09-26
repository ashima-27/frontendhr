import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = (defaultTitle) => {
  const location = useLocation();

  useEffect(() => {
    
    const pageTitleMap = {
      "/": "Home - Infinity HR Management Tool",
      "/admin": "Admin Dashboard - Infinity HR",
      "/admin/addEmployee": "Add Employee - Infinity HR",
      "/admin/sendNoti": "Send Notification - Infinity HR",
      "/admin/scheduleMeet": "Schedule Meeting - Infinity HR",
      "/admin/ticketDashboard": "Ticket Dashboard - Infinity HR",
      "/admin/notification": "Notification Dashboard - Infinity HR",
      "/admin/empdetails": "Employee Details - Infinity HR",
      "/admin/emailform": "Email Template Form - Infinity HR",
      "/admin/emaildashboard": "Email Templates - Infinity HR",
      "/admin/sendEmail": "Send Email - Infinity HR",
      "/admin/recepientDashboard": "Recipient Dashboard - Infinity HR",
      "/user/ticketDashboard": "User Ticket Dashboard - Infinity HR",
      "/user/notification": "User Notifications - Infinity HR",
      "/user/raiseticket": "Raise Ticket - Infinity HR",
      "/changePassword": "Change Password - Infinity HR",
      "/forgetPassword": "Forgot Password - Infinity HR",
      "/resetPassword": "Reset Password - Infinity HR",
      "/createBlog": "Create Blog - Infinity HR",
      "/blog": "Blog Details - Infinity HR",
      "/draftDashboard": "Draft Dashboard - Infinity HR",
      "/blogDashboard": "Blog Dashboard - Infinity HR",
    };

 
    const currentPath = location.pathname;


    document.title = pageTitleMap[currentPath] || defaultTitle;
  }, [location.pathname, defaultTitle]);
};

export default usePageTitle;
