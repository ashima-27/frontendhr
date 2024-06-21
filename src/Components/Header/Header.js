import { useState, useEffect } from 'react';
import { Dialog } from "@headlessui/react";
import { Tooltip } from 'react-tooltip';
import "react-tooltip/dist/react-tooltip.css";
import {
  MenuIcon,
  XIcon,
  UserCircleIcon,
  ClipboardCheckIcon,
  CalendarIcon,
  TemplateIcon,
  MailIcon,
  TicketIcon,
  LockClosedIcon,
  LogoutIcon,
  HomeIcon,
  DocumentDuplicateIcon ,
  NewspaperIcon
} from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../Redux/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Sidebar({ isSidebarVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("role"));
  const name = Cookies.get("userName");
  
  useEffect(() => {
    const roles = Cookies.get("role");
    if (roles) {
      setIsLoggedIn(true);
      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("admin"));
    }
  }, [Cookies.get("role")]);

  const handleLogout = () => {
    Cookies.remove("role");
    Cookies.remove("userName");
    dispatch(logout());
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleMenuCloseAndLogout = () => {
    setMobileMenuOpen(false);
    handleLogout();
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <aside className={`w-full overflow-visible lg:block fixed lg:left-0 top-0 lg:h-screen bg-white z-50 shadow-md overflow-y-auto transition-all duration-300 ${isSidebarVisible ? 'lg:w-1/12 ' : 'w-full lg:w-64'}`} style={{backgroundColor:'#090a72f7',overflow:'visible'}}>
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between p-4 lg:p-6">
        <div className="flex items-center text-white">
          <span className="text-lg font-semibold">HR</span>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 lg:p-6">
        <div className="flex items-center justify-around">
          <span className="text-lg font-semibold text-white ">HR</span>
          <span className="ml-5 text-gray-500 ">Welcome, {name}</span>
        </div>
        <button
          className="focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XIcon className="h-6 w-6 text-gray-500" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-500" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="hidden lg:block px-2 lg:px-2 overflow-visible">
        <div className="space-y-1 overflow-visible">
          {isAdmin && (
            <>
              <NavLinkWithIcon to="/admin" icon={UserCircleIcon} label="Dashboard" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible}/>
              <NavLinkWithIcon to="/admin/notification" icon={ClipboardCheckIcon} label="Send Notification" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible}/>
              <NavLinkWithIcon to="/admin/scheduleMeet" icon={CalendarIcon} label="Schedule Meeting" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible}/>
              <NavLinkWithIcon to="/admin/emaildashboard" icon={TemplateIcon} label="Templates" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible}/>
              <NavLinkWithIcon to="/admin/recepientDashboard" icon={MailIcon} label="Sent Mails" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible} />
              <NavLinkWithIcon to="/admin/ticketDashboard" icon={TicketIcon} label="Tickets Dashboard" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible}/>
              <NavLinkWithIcon to="/admin/blogDashboard" icon={NewspaperIcon} label="Blog Dashboard" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible}/>
              <NavLinkWithIcon to="/draftDashboard" icon={DocumentDuplicateIcon} label="Draft Dashboard" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible}/>
         
            </>
          )}
          {!isAdmin && (
            <>
              <NavLinkWithIcon to="/user" icon={UserCircleIcon} label="Profile" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/user/ticketDashboard" icon={TicketIcon} label="Ticket Dashboard" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/user/notification" icon={ClipboardCheckIcon} label="Notification" onClick={() => setMobileMenuOpen(false)} />
            </>
          )}
        </div>

        <div className="mt-auto pt-4">
          <NavLinkWithIcon to="/changePassword" icon={LockClosedIcon} label="Change Password" onClick={() => setMobileMenuOpen(false)} isSidebarVisible={isSidebarVisible} />
          <NavLinkWithIcon to="/login" icon={LogoutIcon} label="Log out" onClick={() => { setMobileMenuOpen(false); handleLogout(); }} isSidebarVisible={isSidebarVisible}/>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden fixed inset-0 z-20"
      >
        <div className="flex justify-end p-4">
          <button className="focus:outline-none" onClick={() => setMobileMenuOpen(false)}>
            <XIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className=" px-2 pt-2 pb-8 space-y-1" style={{backgroundColor:'#090a72f7'}}>
          {isAdmin && (
            <>
              <NavLinkWithIcon to="/admin" icon={UserCircleIcon} label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/admin/notification" icon={ClipboardCheckIcon} label="Send Notification" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/admin/scheduleMeet" icon={CalendarIcon} label="Schedule Meeting" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/admin/emaildashboard" icon={TemplateIcon} label="Templates" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/admin/recepientDashboard" icon={MailIcon} label="Sent Mails" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/admin/ticketDashboard" icon={TicketIcon} label="Tickets Dashboard" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/admin/blogDashboard" icon={NewspaperIcon} label="Blog Dashboard" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/draftDashboard" icon={DocumentDuplicateIcon} label="Draft Dashboard" onClick={() => setMobileMenuOpen(false)} />
         
            </>
          )}
          {!isAdmin && (
            <>
              <NavLinkWithIcon to="/user" icon={UserCircleIcon} label="Profile" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/user/ticketDashboard" icon={TicketIcon} label="Ticket Dashboard" onClick={() => setMobileMenuOpen(false)} />
              <NavLinkWithIcon to="/user/notification" icon={ClipboardCheckIcon} label="Notification" onClick={() => setMobileMenuOpen(false)} />
            </>
          )}
        </div>

        <div className="bg-white border-t pt-4 pb-2" style={{backgroundColor:'#090a72f7'}}>
          <NavLinkWithIcon to="/changePassword" icon={LockClosedIcon} label="Change Password" onClick={() => setMobileMenuOpen(false)} />
          <NavLinkWithIcon to="/login" icon={LogoutIcon} label="Log out" onClick={() => { setMobileMenuOpen(false); handleLogout(); }} />
        </div>
      </Dialog>
    </aside>
  );
}

function NavLinkWithIcon({ to, icon: Icon, label, onClick ,isSidebarVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div className={`relative flex items-center ${isSidebarVisible ? "justify-center " : "" }overflow-visible`} >
      <NavLink
        to={to}
        end
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center py-2 px-4 rounded-md transition duration-200 ${
            isActive
              ? 'text-indigo-600 bg-gray-200'
              : 'text-gray-900 text-white hover:text-indigo-600 hover:bg-gray-100'
          }`
        }
       onMouseLeave={handleMouseLeave}
       onMouseEnter={handleMouseEnter}
      >
        <Icon className={`${isSidebarVisible ? 'h-7 w-7 ' : 'text-bold h-6 w-6 mr-4'}`} />
        <span className={`${isSidebarVisible ? 'hidden' : 'lg:inline-block'}`}>{label}</span>
      </NavLink>
      {isHovered && isSidebarVisible && (
       
        
        <div
          className="absolute overflow-visible top-full top-1/2 transform -translate-y-1/2 ml-2 p-2 text-sm bg-gray-100 text-indigo-600 rounded-md shadow-lg z-50 whitespace-nowrap"
        >
          {label}
        </div>
     )}
    </div>
    </> 
  );
}
