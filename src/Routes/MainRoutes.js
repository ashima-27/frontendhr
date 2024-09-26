import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../Components/AdminDashboard/AdminDashboard";
import EmployeeForm from "../Popups/AddEmployee/AddEmployee";
import SendNotification from "../Components/SendNotification/SendNotification";
import MeetingScheduler from "../Components/ScheduleMeeting/ScheduleMeeting";
import RaiseTickets from "../Components/RaiseTicket/RaiseTicket";
import TicketsDashboard from "../Components/TicketDashboard/TicketDashboard";
import NotificationsDashboard from "../Components/Notifications/Notification";
import EmployeeDetails from "../Components/EmpDetails/EmpDetails";
import Login from "../Components/Login/Login";
import Profile from "../Components/Profile/Profile";
import EmailTemplateForm from "../Components/EmailTemplate/EmailTemplate";
import TemplateDashboard from "../Components/TemplateDashboard/TemplateDashboard";
import SendEmailComponent from "../Components/SendEmail/SendEmail";
import RecepientDashboard from "../Components/RecepientDashboard/RecepientDashboard";
import ChangePassword from "../Components/ChangePassword/ChangePassword";
import ForgotPassword from "../Components/ForgetPassword/ForgetPassword";
import ResetPassword from "../Components/ResetPassword/ResetPassword";
import BlogDashboard from "../Components/BlogDashboard/BlogDashboard";
import CreateBlog from "../Components/CreateBlog/CreateBlog";
import BlogDetail from "../Components/BlogDetail/BlogDetail";
import BlogDraft from "../Components/DraftDashboard/DraftDashboard";

const AdminRoutes = () => (
  <>
   <Routes>
    <Route index element={<AdminDashboard />} />
    <Route path="addEmployee" element={<EmployeeForm />} />
    <Route path="sendNoti" element={<SendNotification />} />
    <Route path="scheduleMeet" element={<MeetingScheduler />} />
    <Route path="ticketDashboard" element={<TicketsDashboard />} />
    <Route path="notification" element={<NotificationsDashboard />} />
    <Route path="empdetails" element={<EmployeeDetails />} />
    <Route path="emailform" element={<EmailTemplateForm/>} />
    <Route path="emaildashboard" element={<TemplateDashboard/>} />
    <Route path="sendEmail" element={<SendEmailComponent/>} />
    <Route path="recepientDashboard" element={<RecepientDashboard/>} />
    <Route path="resetPassword" element={<ResetPassword/>}/>
    <Route path="createBlog" element={<CreateBlog/>}/>
    
    </Routes>
  </>
);

const UserRoutes = () => (
  <>
  <Routes>
    <Route index element={<Profile />} />
  
    <Route path="ticketDashboard" element={<TicketsDashboard />} />
    <Route path="notification" element={<NotificationsDashboard />} />
    <Route path="raiseticket" element={<RaiseTickets />} />
    </Routes>
  </>
);

const MainRoutes = [
  {
    path:'/*',
   element:<Login/>
  },
  {
    path: "/admin*",
    element: <AdminRoutes />,
  },
  {
    path: "/user*",
    element: <UserRoutes />,
  },
  {
    path:'changePassword',
    element:<ChangePassword/>
  },
  {
    path:'forgetPassword',
    element:<ForgotPassword/>
  },
  {
    path:'resetPassword',
    element:<ResetPassword/>
  },
  {
    path:'blog',
    element:<BlogDetail/>
  },
  {
    path:'/draftDashboard',
    element:<BlogDraft/>
  },
  {
    path:'/blogDashboard',
    element:<BlogDashboard/>
  }
];

export default MainRoutes;
