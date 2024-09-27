import React, { lazy } from "react";
import PrivateRoute from "./PrivateRoute";

// Lazy load all components
const AdminDashboard = lazy(() => import("../Components/AdminDashboard/AdminDashboard"));
const EmployeeForm = lazy(() => import("../Popups/AddEmployee/AddEmployee"));
const SendNotification = lazy(() => import("../Components/SendNotification/SendNotification"));
const MeetingScheduler = lazy(() => import("../Components/ScheduleMeeting/ScheduleMeeting"));
const RaiseTickets = lazy(() => import("../Components/RaiseTicket/RaiseTicket"));
const TicketsDashboard = lazy(() => import("../Components/TicketDashboard/TicketDashboard"));
const NotificationsDashboard = lazy(() => import("../Components/Notifications/Notification"));
const EmployeeDetails = lazy(() => import("../Components/EmpDetails/EmpDetails"));
const Login = lazy(() => import("../Components/Login/Login"));
const Profile = lazy(() => import("../Components/Profile/Profile"));
const ChangePassword = lazy(() => import("../Components/ChangePassword/ChangePassword"));
const ForgotPassword = lazy(() => import("../Components/ForgetPassword/ForgetPassword"));
const ResetPassword = lazy(() => import("../Components/ResetPassword/ResetPassword"));
const EmailTemplateForm = lazy(() => import("../Components/EmailTemplate/EmailTemplate"));
const TemplateDashboard = lazy(() => import("../Components/TemplateDashboard/TemplateDashboard"));
const SendEmailComponent = lazy(() => import("../Components/SendEmail/SendEmail"));
const RecepientDashboard = lazy(() => import("../Components/RecepientDashboard/RecepientDashboard"));
const CreateBlog = lazy(() => import("../Components/CreateBlog/CreateBlog"));
const BlogDetail = lazy(() => import("../Components/BlogDetail/BlogDetail"));
const BlogDraft = lazy(() => import("../Components/DraftDashboard/DraftDashboard"));
const BlogDashboard = lazy(() => import("../Components/BlogDashboard/BlogDashboard"));

const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <PrivateRoute requiredRole="admin">
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/addEmployee",
    element: (
      <PrivateRoute requiredRole="admin">
        <EmployeeForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/sendNoti",
    element: (
      <PrivateRoute requiredRole="admin">
        <SendNotification />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/scheduleMeet",
    element: (
      <PrivateRoute requiredRole="admin">
        <MeetingScheduler />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/ticketDashboard",
    element: (
      <PrivateRoute requiredRole="admin">
        <TicketsDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/notification",
    element: (
      <PrivateRoute requiredRole="admin">
        <NotificationsDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/empdetails",
    element: (
      <PrivateRoute requiredRole="admin">
        <EmployeeDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/emailform",
    element: (
      <PrivateRoute requiredRole="admin">
        <EmailTemplateForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/emaildashboard",
    element: (
      <PrivateRoute requiredRole="admin">
        <TemplateDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/sendEmail",
    element: (
      <PrivateRoute requiredRole="admin">
        <SendEmailComponent />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/recepientDashboard",
    element: (
      <PrivateRoute requiredRole="admin">
        <RecepientDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/createBlog",
    element: (
      <PrivateRoute requiredRole="admin">
        <CreateBlog />
      </PrivateRoute>
    ),
  },
 
];

const UserRoutes = [
  {
    path: "/user",
    element: (
      <PrivateRoute requiredRole="user">
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/ticketDashboard",
    element: (
      <PrivateRoute requiredRole="user">
        <TicketsDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/notification",
    element: (
      <PrivateRoute requiredRole="user">
        <NotificationsDashboard />
      </PrivateRoute>
    ),
  },
  
];

const MainRoutes = [
  { path: "/", element: <Login /> },
  { path: "/changePassword", element: <ChangePassword /> },
  { path: "/forgetPassword", element: <ForgotPassword /> },
  { path: "/resetPassword", element: <ResetPassword /> },
  { path: "/blog", element: <BlogDetail /> },
  { path: "/draftDashboard", element: <BlogDraft /> },
  { path: "/blogDashboard", element: <BlogDashboard /> },
  {    path: "/raiseticket", element:       <RaiseTickets />   
  },
  ...AdminRoutes,
  ...UserRoutes,
];

export default MainRoutes;
