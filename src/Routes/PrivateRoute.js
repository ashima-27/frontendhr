import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const userRole = Cookies.get("role") ? JSON.parse(Cookies.get("role")) : null;

  console.log("User Role from cookie:", userRole)


  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  
  if (userRole && userRole !== requiredRole) {
    return userRole === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/user" replace />
    );
  }

  
  return children;
};

export default PrivateRoute;
