import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useUser();

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
