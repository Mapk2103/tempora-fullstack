import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <main className="page-state">
        <div className="state-spinner" aria-hidden="true" />
        <h1>Validando sesión</h1>
      </main>
    );
  }

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
