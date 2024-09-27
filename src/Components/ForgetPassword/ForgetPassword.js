import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { clearAllSliceStates, forgotPassword } from "../../Redux/auth";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/images/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const {
    isAuthSliceFetchingSmall,
    ischngeSliceSuccess,
    ischngeSliceSuccessMessage,
    ischngeSliceError,
    ischngeSliceErrorMessage,
  } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = { email: email };
    dispatch(forgotPassword(obj));
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
    }
    return () => {
      dispatch(clearAllSliceStates());
    };
  }, [ischngeSliceSuccess]);

  useEffect(() => {
    if (ischngeSliceError) {
      errorToast();
    }
    return () => {
      dispatch(clearAllSliceStates());
    };
  }, [ischngeSliceError]);

  useEffect(() => {
    if (clearAllSliceStates) {
      dispatch(clearAllSliceStates());
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full bg-[#eff2f9] relative m-0 p-0">
      <div className="flex mt-12 justify-center items-center w-11/12 mx-auto flex-col">
        <ToastContainer />
        <div className="bg-white flex flex-col justify-center items-center shadow-2xl rounded-lg p-6 lg:w-4/12 gap-2 m-4 z-[10]">
          <img src={logo} alt="logo" className="h-10 flex justify-center items-center" />
          <h2 className="text-2xl font-semibold my-4">Forgot Password</h2>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="text-left block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
                placeholder="Enter Email"
              />
            </div>
            <button
              type="submit"
              disabled={isAuthSliceFetchingSmall}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {isAuthSliceFetchingSmall ? '.....' : 'Send Reset Link'}
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

export default ForgotPassword;
