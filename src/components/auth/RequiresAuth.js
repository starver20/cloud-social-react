import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth-context';

const RequiresAuth = ({ children }) => {
  const { user } = useAuth();
  console.log(user);

  const location = useLocation();

  return user?.jwt ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default RequiresAuth;
