import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllSliceStates,  changePassword    } from "../../Redux/auth";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import ComponentLoader from '../ComponentLoader/ComponentLoader';
const ChangePasswordComp = () => {
  const {
    isAuthSliceFetching,
    ischngeSliceSuccess,
    isAuthSliceFetchingSmall,
    ischngeSliceSuccessMessage,
    ischngeSliceError,
    ischngeSliceErrorMessage,
    user
  } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const toggleShowPassword = (field) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  };
  const successToast = () => {
    toast.success(ischngeSliceSuccessMessage, {
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const errorToast = () => {
    toast.error(ischngeSliceErrorMessage, {
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  useEffect(() => {
    if (ischngeSliceSuccess) {
        successToast();
    
        return(()=>{
          dispatch(clearAllSliceStates())
        })
      }
  }, [ischngeSliceSuccess]);

  useEffect(() => {
    if (ischngeSliceError) {
        errorToast();
    return(()=>{
      dispatch(clearAllSliceStates())
    })
  }
  }, [ischngeSliceError]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { currentPassword: "", newPassword: "", confirmNewPassword: "" };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long.";
    } else if (!/[a-zA-Z]/.test(formData.newPassword) || !/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain both letters and numbers.";
    }

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Confirming the new password is required.";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "New passwords do not match.";
    }

    if (newErrors.currentPassword || newErrors.newPassword || newErrors.confirmNewPassword) {
      setErrors(newErrors);
      return;
    }

    console.log('Changing password...', formData);
    dispatch(  changePassword(formData));
  };



  return (
    <>
    <ToastContainer />
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-1">Current Password</label>
            <input 
              type={showPasswords.currentPassword ? "text" : "password"} 
              id="currentPassword" 
              name="currentPassword" 
              value={formData.currentPassword} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required 
            />
            <span 
              onClick={() => toggleShowPassword("currentPassword")}
              className="absolute right-3 top-10 cursor-pointer text-gray-600"
            >
              {showPasswords.currentPassword ? "Hide" : "Show"}
            </span>
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password</label>
            <input 
              type={showPasswords.newPassword ? "text" : "password"} 
              id="newPassword" 
              name="newPassword" 
              value={formData.newPassword} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required 
            />
            <span 
              onClick={() => toggleShowPassword("newPassword")}
              className="absolute right-3 top-10 cursor-pointer text-gray-600"
            >
              {showPasswords.newPassword ? "Hide" : "Show"}
            </span>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmNewPassword" className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
            <input 
              type={showPasswords.confirmNewPassword ? "text" : "password"} 
              id="confirmNewPassword" 
              name="confirmNewPassword" 
              value={formData.confirmNewPassword} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required 
            />
            <span 
              onClick={() => toggleShowPassword("confirmNewPassword")}
              className="absolute right-3 top-10 cursor-pointer text-gray-600"
            >
              {showPasswords.confirmNewPassword ? "Hide" : "Show"}
            </span>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={isAuthSliceFetchingSmall}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
             {isAuthSliceFetchingSmall ? '.....' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ChangePasswordComp;
