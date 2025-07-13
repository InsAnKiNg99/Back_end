// services/protectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();


  const storedUser = localStorage.getItem("user");

  if (!user && !storedUser) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render nested route
  return <Outlet />;
};

export default ProtectedRoute;
