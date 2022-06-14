import React from 'react';
import { Outlet } from 'react-router-dom';
import CardAccount from '../../components/userAccount/utils/CardAccount';

const MyAccount = () => {
  return (
    <>
      <section className='myAccount flex justify-center flex-wrap mb-10'>
        <CardAccount title="Account Gestion" logo="settings" link="/myAccount/accountGestion" />
        <CardAccount title="Yours Commands" logo="cube" link="/myAccount/userOrder" />
        <CardAccount title="WishList" logo="heart-empty" link="/myAccount/userWishList" />
        <CardAccount title="Ticket" logo="mail" link="/myAccount/ticket" />
      </section>
      <Outlet />
    </>
  );
};

export default MyAccount;