import React from 'react';

import Footer from '../components/includes/Footer';
import Header from '../components/includes/Header';
import LastProduct from '../components/product/LastProduct';
import OurProduct from '../components/product/OurProduct';

const Home = () => {



  return (
    <>
      <Header />
      <section className='mx-3 mt-10'>
        <LastProduct />
        <OurProduct />
      </section>
      <Footer />
    </>
  );
};

export default Home;