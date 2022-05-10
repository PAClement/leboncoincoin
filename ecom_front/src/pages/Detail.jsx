import React from 'react';
import Footer from '../components/includes/Footer';
import Header from '../components/includes/Header';

const detail = () => {

  const btnCss = "";

  return (
    <>
      <Header />
      <section className='mt-10 mx-52 flex detail'>
        <div className='flex justify-center mr-10'>
          <div className='w-4/12 mx-5 mb-5'>
            <img src="https://via.placeholder.com/80x80" alt="" className='mb-2' />
            <img src="https://via.placeholder.com/80x80" alt="" className='mb-2' />
            <img src="https://via.placeholder.com/80x80" alt="" className='mb-2' />
            <img src="https://via.placeholder.com/80x80" alt="" className='mb-2' />
          </div>
          <img src="https://via.placeholder.com/400x600" alt="" />
        </div>
        <div className='w-8/12 flex flex-col justify-evenly'>
          <div>
            <h2 className='text-3xl font-bold mb-10'>NAME OF ARTICLE</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequatur blanditiis illo minus? Fugit ullam quasi quibusdam, earum necessitatibus est quo.
            </p>
          </div>
          <h3 className='text-2xl'>PRICE</h3>
          <div className='flex'>
            <button type="button" className=" mr-5 inline-block px-6 py-2.5 cartBtn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">Add to cart</button>
            <button className='inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'>
              <span className='text-xl'><ion-icon name="heart"></ion-icon></span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default detail;