import React from 'react';

const GoBack = (props) => {
  return (
    <div className='my-10'>
      <a href={props.link}>
        <button className='mb-5 inline-block px-6 py-2.5 hd-btn text-white w-2/12 font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'>
          <span className='mr-2 align-middle text-xl'><ion-icon name="arrow-back"></ion-icon></span> Go back
        </button>
      </a>
      <h2 className='text-4xl uppercase'>{props.title} : </h2>
    </div>
  );
};

export default GoBack;