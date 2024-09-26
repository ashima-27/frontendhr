import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAllSliceStates, loginUser, logout } from "../../Redux/auth";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const Login = () => {
  const {
    isAuthSliceFetching,
    isAuthSliceSuccess,
    isAuthSliceError,
    isAuthSliceFetchingSmall,
    authSliceErrorMessage,
    user,
  } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ email: "", password: "" });
  };
  useEffect(() => {
    if (isAuthSliceSuccess) {
      dispatch(clearAllSliceStates());
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
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
    console.log("Logging in...", formData);
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
    dispatch(logout());
    if (isAuthSliceError) {
      errorToast();
    }
  }, [isAuthSliceError]);

  return (
    <div className="flex flex-col justify-center items-center w-full  mx-auto bg-[#eff2f9]" >
      <div className="flex flex-col justify-center items-center w-11/12  mx-auto ">
        <ToastContainer />
        <div className="bg-white flex flex-col justify-center items-center shadow-2xl rounded-lg p-6 lg:w-4/12 gap-2 m-4 z-[10]">
          <img
            src={logo}
            alt="logo"
            className=" h-10 flex justify-center items-center"
          />
          <h2 className="text-2xl font-semibold ">Welcome Back</h2>
          <p className="mb-4">Enter Your Credentials To Access Your Account</p>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-left block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-left block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <span className=" mb-4 p-2 text-sm text-gray-900 cursor-pointer">
              Forgot Your Password ?
              <NavLink to="/forgetPassword" className="text-blue-600 ">
                {" "}
                Reset Password
              </NavLink>
            </span>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 my-2  px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              disabled={isAuthSliceFetchingSmall}
            >
              {isAuthSliceFetchingSmall ? "....." : "Login"}
            </button>
          </form>
        </div>
      </div>
      <div className="w-full absolute bottom-0">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,192L34.3,192C68.6,192,137,192,206,202.7C274.3,213,343,235,411,224C480,213,549,171,617,165.3C685.7,160,754,192,823,197.3C891.4,203,960,181,1029,160C1097.1,139,1166,117,1234,133.3C1302.9,149,1371,203,1406,229.3L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Login;
