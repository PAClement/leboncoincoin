import React from 'react';
import Footer from '../../components/includes/Footer';
import Header from '../../components/includes/Header';
import CardAccount from '../../components/userAccount/CardAccount';

const MyAccount = () => {
  return (
    <>
      <Header />
      <section className='mt-16'>
        <div className='myAccount flex justify-center'>
          <CardAccount title="Account Gestion" logo="settings" link="myAccount/accountGestion" />
          <CardAccount title="Yours Commands" logo="cube" link="" />
          <CardAccount title="Returns" logo="swap" link="" />
        </div>
        <div className='flex justify-center mt-32'>
          <button className="inline-block px-6 py-2.5 hd-btn text-white w-4/12 font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
            <span className='mr-2 align-middle text-xl'><ion-icon name="text"></ion-icon></span> Contact us
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyAccount;