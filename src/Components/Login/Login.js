import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAllSliceStates, loginUser, logout } from "../../Redux/auth"
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import {NavLink} from 'react-router-dom';
const Login = () => {

  const {
    isAuthSliceFetching,
    isAuthSliceSuccess,
    isAuthSliceError,
    isAuthSliceFetchingSmall,
    authSliceErrorMessage,
user
  } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ email: "", password: "" });
  };
  useEffect(() => {
    if (isAuthSliceSuccess) {
      dispatch(clearAllSliceStates())
      if(user.role==='admin'){
      navigate("/admin", { replace: true });
      }else{
        navigate("/user", { replace: true });
      }
    }
  }, [isAuthSliceSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    console.log('Logging in...', formData);
    dispatch(loginUser(formData));
  };
  const errorToast = () => {
    toast.error(authSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  useEffect(() => {
    //  Clears all the states in the redux store
    dispatch(logout())
    if(isAuthSliceError){
      errorToast()
    }
  }, [isAuthSliceError])

  return (
    <div className="flex justify-center items-center h-screen ">
    <ToastContainer/>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required 
             
             
            />
      {errors.email && (
    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
)}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
             
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required 
            />
            {errors.password && (
    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
)}
          </div>
          <span className='m-2 p-2 text-sm text-gray-800'><NavLink to='/forgetPassword'>Forgot Password</NavLink></span>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
             disabled={isAuthSliceFetchingSmall}
          >
            {isAuthSliceFetchingSmall ? '.....' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
