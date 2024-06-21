import logo from './logo.svg';
import './App.css';
// import Header from './Components/Header/Header';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import axios from 'axios';
import { messaging } from './firebaseConfig';
import { getToken } from 'firebase/messaging';
import { useLocation } from 'react-router-dom';
import { useEffect ,useState} from 'react';
import SendNotification from './Components/SendNotification/SendNotification';
import MeetingScheduler from './Components/ScheduleMeeting/ScheduleMeeting';
import ApplicationRoutes from './Routes';
import Sidebar from './Components/Header/Header';
import MenuBar from './Components/MenuBar/MenuBar';
import { resetPassword } from './Redux/auth';
function App() {
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  async function requestPermission(){
    const permission=await Notification.requestPermission()
      if(permission ==='granted'){
        const token= await getToken(messaging,{
          validKey:"BOmidzmpHw1TJ3R3kZ7gp7zj8hCJw2dY3U-nWtAIEEsn-O6Q12lbn-mErtozS9GfsDf3Y7F_vIqoxKDhA82Iaeg"
        })
       console.log("token",token)
       //send this token to dbb
       await saveTokenToDB(token);
      }else if(permission === 'denied'){
        alert("you denied");
      }
    
  }
  async function saveTokenToDB(token) {
    try {
      await axios.post(`${apiUrl}/save-token`, { token });
      console.log("Token saved to DB successfully");
    } catch (error) {
      console.error("Error saving token to DB", error);
    }
  }
  useEffect(() => { 
    requestPermission();
  }, []);
  
  const getRouteName = (path) => {
    switch (path) {
      case '/admin':
        return 'Dashboard';
      case '/admin/notification':
        return 'Send Notification';
      case '/admin/scheduleMeet':
        return 'Schedule Meeting';
      case '/admin/emaildashboard':
        return 'Templates';
      case '/admin/recepientDashboard':
        return 'Sent Mails';
      case '/admin/ticketDashboard':
        return 'Tickets Dashboard';
      case '/user':
        return 'Profile';
      case '/user/ticketDashboard':
        return 'Ticket Dashboard';
      case '/user/notification':
        return 'Notification';
       case '/changePassword':
         return 'Change Password';
       case '/user/raiseticket':
        return 'Raise Ticket';
        case '/admin/raiseticket':
        return 'Raise Ticket';
        case '/admin/sendEmail':
          return 'Send Emails';
          case '/admin/emailform':
            return 'Add New Template';
            case '/login':
              return 'login';
              case '/forgetPassword':
                return 'forgetPassword';
                case '/resetPassword':
                  return 'resetPassword';
                  case '/admin/blogDashboard':
                    return 'Blog Dashboard';
                    case '/draftDashboard':
                      return 'Draft Dashboard'
      default:
        return '';
    }
  };

  const currentRouteName = getRouteName(location.pathname);

  return (
    <div className="App flex flex-col lg:flex-row">
     <div >
        <Sidebar isSidebarVisible={!isSidebarVisible} />
      </div>
   
      <main className={`flex-1 ${isSidebarVisible? 'lg:ml-64' : 'w-full' }`} >
      {(currentRouteName !== 'login' || currentRouteName !== 'forgetPassword' || currentRouteName !== 'resetPassword' )&& (
  <div className={`invisible lg:visible ${isSidebarVisible ?  '':'lg:ml-20 lg:px-5  '}`}>
    <MenuBar currentRouteName={currentRouteName} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
  </div>
 
)}
   <div className={`pt-8 mt-5  ${isSidebarVisible ?  '':'lg:ml-20 lg:px-5' }`}>
          <ApplicationRoutes />
        </div>
      </main>
    </div>
  );
}

export default App;
