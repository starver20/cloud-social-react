import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequiresAuth = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();

  return user?.jwt ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default RequiresAuth;
