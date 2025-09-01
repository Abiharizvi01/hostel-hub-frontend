import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const WardenPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in AND is a Warden
  if (userInfo && userInfo.role === 'Warden') {
    return <Outlet />; // If yes, show the page
  } else {
    return <Navigate to='/' replace />; // If no, redirect to home page
  }
};

export default WardenPrivateRoute;