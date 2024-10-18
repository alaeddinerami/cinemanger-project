import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jsonwebtoken"; 

const getToken = () => {
  return localStorage.getItem("token");
};

const getUserFromToken = (token) => {
  try {
    return jwt_decode(token); 
  } catch (error) {
    return null;
  }
};

const ProtectedRoute = ({ role, children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const user = getUserFromToken(token);
  if (!user || (role && user.role !== role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
