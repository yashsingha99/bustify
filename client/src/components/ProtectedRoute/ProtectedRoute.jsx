import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; 

const ProtectedRoute = ({ component: Component, checkLoginOrSignUp = false, ...rest }) => {
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get('token');

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (token) {
      try {
        jwtDecode(token);
      } catch (error) {
        Cookies.remove('token'); 
        navigate("/login"); 
      }
    }
  }, [navigate]);

  if (!isAuthenticated && !checkLoginOrSignUp) {
    return <Navigate to="/login" />; 
  }

  if (isAuthenticated && checkLoginOrSignUp) {
    return <Navigate to="/" />; 
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
