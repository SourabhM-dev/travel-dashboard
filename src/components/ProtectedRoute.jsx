
import React from 'react';
import { Navigate } from 'react-router-dom';

const useAuth = () => {

  const user = null; 
  return { isAuthenticated: !!user };
};

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}