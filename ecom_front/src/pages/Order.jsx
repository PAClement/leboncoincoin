import React from 'react';
import Footer from '../components/includes/Footer';
import Header from '../components/includes/Header';

const Order = () => {
  return (
    <>
      <Header />
      <section className='mx-3 mt-10'>
        <h2>1 - Choisir votre transporteur</h2>
        <h2>2 - Mode de livraison</h2>
        <h2>3- Vérification et validation de votre commande</h2>
      </section>
      <Footer />
    </>
  );
};

export default Order;