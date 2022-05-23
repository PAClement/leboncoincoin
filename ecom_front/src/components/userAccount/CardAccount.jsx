import React from 'react';
import { Link } from 'react-router-dom';

const CardAccount = (props) => {
  return (
    <Link to={props.link} className='flex flex-col justify-between items-center w-96 h-62 mx-10 py-7'>
      <span className='text-8xl mb-20'>
        <ion-icon name={props.logo}></ion-icon>
      </span>
      <p className='text-4xl'>{props.title}</p>
    </Link>
  );
};

export default CardAccount;
