import React from 'react';
import Card from '../components/Card';

import Footer from '../components/includes/Footer';
import Header from '../components/includes/Header';

const Home = () => {

  const final = [];
  let i = 0;

  while (i < 15) {

    final.push(<Card />);

    i++;
  }

  return (
    <>
      <Header />
      <section className='mx-3 mt-10' >
        <h2 className='text-2xl'>Derniers ajouts : </h2>
        <div className='mb-10 overflow-x-scroll whitespace-nowrap box-border'>
          {final}
        </div>
        <h2 className='text-2xl'>Nos articles : </h2>
        <div className='flex justify-center flex-wrap'>
          {final}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;