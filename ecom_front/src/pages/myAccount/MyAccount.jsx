import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/includes/Footer';
import Header from '../../components/includes/Header';
import CardAccount from '../../components/userAccount/CardAccount';

const MyAccount = () => {
  return (
    <>
      <Header />
      <section className='myAccount flex justify-center mb-10'>
        <CardAccount title="Account Gestion" logo="settings" link="/myAccount/accountGestion" />
        <CardAccount title="Yours Commands" logo="cube" link="" />
        <CardAccount title="WishList" logo="heart-empty" link="" />
      </section>
      <Outlet />
      <Footer />
    </>
  );
};

export default MyAccount;