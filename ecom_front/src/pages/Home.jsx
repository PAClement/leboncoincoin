import React from 'react';
import LastProduct from '../components/product/LastProduct';
import OurProduct from '../components/product/OurProduct';

const Home = () => {



  return (
    <>
      <section className='mx-3 mt-10'>
        <LastProduct />
        <OurProduct />
      </section>
    </>
  );
};

export default Home;