import React, {useState, useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../component/loader";
import { Footer } from '../component/footer';

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const isAuthenticated = token !== null && token !== undefined && token !== "";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const [isLoading, setIsLoading] = useState(false);
          useEffect(() => {
            const timer = setTimeout(() => {
              setIsLoading(false);
            }, 1500);
        
            return () => clearTimeout(timer); 
          }, []);
        


  return (isLoading) ? <Loader /> : <Outlet />;
};
