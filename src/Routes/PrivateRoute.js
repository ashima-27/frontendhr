import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const userRole = Cookies.get("role") ? JSON.parse(Cookies.get("role")) : null;

  console.log("User Role from cookie:", userRole);

  // If no role is found in cookies, redirect to the login page
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // Check if the requiredRole is an array and includes the userRole
  if (requiredRole && !requiredRole.includes(userRole)) {
    // Redirect to the correct dashboard based on the user's role
    return userRole === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/user" replace />
    );
  }

  // If role matches, render the children components
  return children;
};

export default PrivateRoute;
