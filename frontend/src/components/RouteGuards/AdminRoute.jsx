import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const location = useLocation();
  const requestedPath = `${location.pathname}${location.search || ""}${location.hash || ""}`;

  if (!userInfo) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(requestedPath)}`}
        replace
        state={{ authMessage: "Please log in to access admin pages." }}
      />
    );
  }

  const isAdmin = userInfo.isAdmin || userInfo.role === "admin";
  if (!isAdmin) {
    return <Navigate to="/" replace state={{ authMessage: "You are not authorized to access admin pages." }} />;
  }

  return <Outlet />;
};

export default AdminRoute;
