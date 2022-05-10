import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const Authentification = () => {

  const inputCss = "appearance-none block w-2/4 bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  const [auth, setAuth] = useState("connexion");

  const inputs = useRef([]);
  const addInputs = el => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }

  const [data, setData] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();

    if (auth === "inscription") {

    } else if (auth === "connexion") {

      axios.get("https://localhost:8000/api/customer", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then((res) => setData(res.data))
      console.log(data);

    }
  }

  return (
    <div className='authentification flex '>

      <div className='w-2/4 pr-10 flex flex-col items-end justify-center'>
        <img src="img/coincoin.png" alt="logo" className='logo mb-16' />
        <p className='text-7xl text-right mb-10'>Welcome to the <br /> Best Website Of <br /> The World</p>
        <button type='submit' className={btnCss}>
          <span className='mr-2 align-middle text-xl'><ion-icon name="search"></ion-icon></span><a href='/'>Discover our website</a>
        </button>
      </div>

      <form onSubmit={handleForm} className='w-2/4 h-screen py-20 flex flex-col items-center justify-center bgColor2'>
        <h2 className='text-4xl mb-16 text-white'>{auth === "inscription" ? "Inscription" : "Connexion"}</h2>

        <input ref={addInputs} type="email" placeholder="Email" className={inputCss} required />
        <input ref={addInputs} type="password" placeholder="Password" className={inputCss} required />
        {auth === "inscription" &&
          <>
            <input ref={addInputs} type="password" placeholder="Confirm Password" className={inputCss} />
            <h3 className='text-xl  my-5 text-white text-left'>Yours informations</h3>
            <div className='flex justify-between w-2/4'>
              <input ref={addInputs} type="text" placeholder="first name" className={inputCss} />
              <span className='mx-1.5'></span>
              <input ref={addInputs} type="text" placeholder="last name" className={inputCss} />
            </div>

            <input ref={addInputs} type="text" placeholder="address" className={inputCss} />

            <div className='flex justify-between w-2/4'>
              <input ref={addInputs} type="text" placeholder="cod post" className={inputCss} />
              <span className='mx-1.5'></span>
              <input ref={addInputs} type="text" placeholder="town" className={inputCss} />
            </div>

            <input ref={addInputs} type="tel" placeholder="telephone" className={inputCss} />
          </>
        }

        <button type='submit' className={btnCss}>
          <span className='mr-2 align-middle text-xl'><ion-icon name={auth === "inscription" ? "open" : "contact"}></ion-icon></span>{auth === "inscription" ? "Inscription" : "Connexion"}
        </button>

        <div className='flex mt-10 items-baseline'>
          <p className='text-white mr-3'>{auth === "inscription" ? "Déjà inscrit ?" : "Pas encore de compte ?"}</p>
          <a className='hover:text-white text-orange-color text-xl' style={{ cursor: "pointer" }} onClick={() => auth === "inscription" ? setAuth("connexion") : setAuth("inscription")}>
            {auth === "inscription" ? "Connexion" : "Inscription"}
          </a>
        </div>
      </form >
    </div >
  );
};

export default Authentification;