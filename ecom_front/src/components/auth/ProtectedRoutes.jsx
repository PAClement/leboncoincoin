import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {

  const user = localStorage.getItem('user')

  return user ? true : false;

}

const ProtectedRoutes = () => {

  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to='/authentification' />

};

export default ProtectedRoutes;