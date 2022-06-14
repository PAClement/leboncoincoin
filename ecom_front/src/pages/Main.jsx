import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/includes/Footer';
import Header from '../components/includes/Header';

const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;