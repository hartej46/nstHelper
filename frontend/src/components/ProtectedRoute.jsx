import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isLoggedin, isCheckingSession } = useSelector((state) => state.auth);

  if (isCheckingSession) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white text-lg font-medium tracking-wide animate-pulse">
        Loading workspace...
      </div>
    );
  }
  return isLoggedin ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoute;