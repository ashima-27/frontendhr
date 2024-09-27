import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../Redux/auth";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("id");

  const {
    isAuthSliceFetchingSmall,
    ischngeSliceSuccess,
    ischngeSliceError,
    ischngeSliceSuccessMessage,
    ischngeSliceErrorMessage
  } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmNewPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ newPassword: "", confirmNewPassword: "" });
  };

  useEffect(() => {
    if (ischngeSliceSuccess) {
      toast.success(ischngeSliceSuccessMessage);
      navigate("/login", { replace: true });
    }
  }, [ischngeSliceSuccess]);

  useEffect(() => {
    if (ischngeSliceError) {
      toast.error(ischngeSliceErrorMessage);
    }
  }, [ischngeSliceError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { newPassword: "", confirmNewPassword: "" };

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must be at least 8 characters long and include both letters and numbers.";
    }

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Confirming the new password is required.";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "New passwords do not match.";
    }

    if (newErrors.newPassword || newErrors.confirmNewPassword) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      token,
      newPassword: formData.newPassword
    };

    dispatch(resetPassword(payload));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-[#eff2f9]">
      <div className="flex flex-col justify-center items-center w-11/12 h-full z-[10] mx-auto bg-[#eff2f9]">
        <ToastContainer />
        <div className="bg-white flex flex-col justify-center items-center shadow-2xl rounded-lg p-6 w-full lg:w-4/12 gap-2 m-4">
          <img src={logo} alt="logo" className='h-10' />
          <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit} className='w-full'>
            <div className="mb-4 relative">
              <label htmlFor="newPassword" className="block text-left text-gray-700 font-medium mb-1">New Password</label>
              <div className='flex flex-row justify-between items-center w-full px-3 py-2 border border-gray-300 rounded'>
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="outline-none w-full"
                  placeholder='New Password'
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="ml-2 text-sm"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="confirmNewPassword" className=" text-left block text-gray-700 font-medium mb-1">Confirm New Password</label>
              <div className='flex flex-row justify-between items-center w-full px-3 py-2 border border-gray-300 rounded'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className="outline-none w-full"
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="ml-2 text-sm"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isAuthSliceFetchingSmall}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              {isAuthSliceFetchingSmall ? '.....' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
      <div className="w-full fixed bottom-0 bg-[#eff2f9] ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,192L34.3,192C68.6,192,137,192,206,202.7C274.3,213,343,235,411,224C480,213,549,171,617,165.3C685.7,160,754,192,823,197.3C891.4,203,960,181,1029,160C1097.1,139,1166,117,1234,133.3C1302.9,149,1371,203,1406,229.3L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ResetPassword;
