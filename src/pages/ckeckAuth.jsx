// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("authtoken");
      if (!token) {
        console.log('Token not found');
        navigate('/login');
      } else {
        try {
          const response = await axios.post('/api/v1/account/checkRole', { token });
          const userRole = response.data.role;
          setIsLoggedIn(true);
          setRole(userRole);
          navigate(`/${userRole}/main`);
        } catch (error) {
          console.error("Error checking role", error);
          navigate('/login');
        }
      }
    };
    getToken();
  }, [navigate]);

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export const useAuth = () => useContext(AuthContext);
