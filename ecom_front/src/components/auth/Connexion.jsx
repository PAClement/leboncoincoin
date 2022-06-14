import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {

  const inputCss = "appearance-none block w-2/4 bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  const navigation = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault();

    axios.post("https://localhost:8000/api/customer_connexion", {

      email,
      password,
    }).then((res) => {

      if (res.data === "Email ou mot de passe incorret") {

        setError(res.data);
      } else {

        setError("");

        localStorage.setItem('user', res.data.uuid);
        navigation('/');
      }

    }).catch((error) => {

      console.log(error);
    })

  }

  return (
    <form onSubmit={handleForm} className='w-full flex flex-col items-center justify-center'>
      <h2 className='text-4xl text-white mb-16'>Connexion</h2>

      {error &&
        <div className="bg-red-500 border border-red-500 text-white px-4 py-3 rounded relative mb-3 flex flex-col text-l" role="alert">

          <span className="block sm:inline my-1">{error}</span>
        </div>
      }

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputCss} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={inputCss} required />

      <button type='submit' className={btnCss}>
        <span className='mr-2 align-middle text-xl'><ion-icon name="contact"></ion-icon></span>Connexion
      </button>
    </form >
  );
};

export default Connexion;