import React from 'react'
import useAuth from '../store/authContext';
import { Navigate } from 'react-router-dom';

function PublicRoutes({children}) {
    const {isLoggedIn} = useAuth();
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

export default PublicRoutes