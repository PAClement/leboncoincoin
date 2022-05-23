
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Connexion from '../components/auth/Connexion';
import Inscription from '../components/auth/Inscription';

const Authentification = () => {

  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  const [auth, setAuth] = useState("connexion");

  return (
    <div className='authentification flex '>

      <div className='w-2/4 pr-10 flex flex-col items-end justify-center'>
        <img src="img/coincoin.png" alt="logo" className='logo mb-16' />
        <p className='text-7xl text-right mb-10'>Welcome to the <br /> Best Website Of <br /> The World</p>
        <NavLink to='/' className={btnCss}>
          <span className='mr-2 align-middle text-xl'><ion-icon name="search"></ion-icon></span>Discover our website
        </NavLink>
      </div>

      <div className='w-2/4 h-screen flex flex-col items-center justify-center bgColor2'>

        {auth === "connexion" ?
          <Connexion />
          :
          <Inscription />
        }

        <div className='flex items-baseline mt-16'>
          <p className='text-white mr-3'>{auth === "inscription" ? "Déjà inscrit ?" : "Pas encore de compte ?"}</p>
          <button className='hover:text-white text-orange-color text-xl' style={{ cursor: "pointer" }} onClick={() => auth === "inscription" ? setAuth("connexion") : setAuth("inscription")}>
            {auth === "inscription" ? "Connexion" : "Inscription"}
          </button>
        </div>
      </div>


    </div >
  );
};

export default Authentification;