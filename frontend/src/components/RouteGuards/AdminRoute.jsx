import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  const isAdmin = userInfo.isAdmin || userInfo.role === "admin";
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
