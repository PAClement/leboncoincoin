import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {

  const user = localStorage.getItem('user');

  return user ? true : false;
}


const PublicRoutes = () => {

  const auth = useAuth();

  return auth ? <Navigate to='/' /> : <Outlet />

};

export default PublicRoutes;