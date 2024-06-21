import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { clearAllSliceStates ,forgotPassword } from "../../Redux/auth"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
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
    console.log("email",email)
    let obj={
        email:email
    }
  dispatch(forgotPassword(obj))
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
    return(()=>{
      dispatch(clearAllSliceStates())
    })
  }, [ischngeSliceSuccess]);

  useEffect(() => {
    if (ischngeSliceError) {
        errorToast();
      
    }
    return(()=>{
      dispatch(clearAllSliceStates())
    })
  }, [ischngeSliceError]);

  return (
    <div className="flex justify-center items-center h-screen">
    <ToastContainer/>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={isAuthSliceFetchingSmall}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {isAuthSliceFetchingSmall ? '.....' : ' Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
