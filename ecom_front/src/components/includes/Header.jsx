
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  const user = localStorage.getItem('user');

  const [category, setCategory] = useState([]);

  const [totalCart, setTotalCart] = useState(0);
  let totalProduct = 0;



  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  useEffect(() => {

    axios.get("https://localhost:8000/api/category").then((res) => {

      setCategory(res.data);

    }).catch((error) => {

      console.log(error);
    });

    axios.get(`https://localhost:8000/api/cartList/${user}`)
      .then((res) => {

        res.data.map((target) => {

          totalProduct += target.quantity;
        })

        setTotalCart(totalProduct);

      }).catch((error) => {

        console.log(error);
      });


  }, [])

  return (
    <header className='bgColor2 shadow-md w-full top-0 left-0 p-3 pb-0'>
      <div className='flex items-end'>
        <Link className='flex items-end w-3/12' to='/'>
          <img src={window.location.origin + '/img/logo.png'} className='logo' alt='our_logo' />
          <h1 className='text-white text-4xl ml-5'>Le Bon CoinCoin</h1>
        </Link>
        <div className='flex mb-2 w-9/12 justify-between h-12'>
          <div className='flex w-full'>
            <input type="search" className="form-control block w-full h-12 px-4 py-2 text-xl text-gray-700 bg-white border  rounded-r-none rounded-l-md border-r-0 transition ease-in-out m-0 focus:text-gray-700 focus:outline-none" placeholder="Search" />
            <Link to="/advanced">
              <button className='form-control h-12 inline-block px-6 py-2.5 bg-white text-black text-xl leading-tight uppercase rounded-t-none rounded-r-md border-l-0 focus:ring-0 transition duration-150 ease-in-out'>
                <ion-icon name="search"></ion-icon>
              </button>
            </Link>
          </div>
          {user ? (
            <>
              <Link to='/cart'>
                <div className="flex space-x-2 justify-center">
                  <button type="button" className={`${btnCss} flex ml-2 justify-center items-center`}>
                    <span className='mr-2 align-center text-xl'><ion-icon name="cart"></ion-icon></span> Cart
                    {totalCart > 0 &&
                      <span className="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2">{totalCart}</span>
                    }
                  </button>
                </div>
              </Link>
              <Link to="/myAccount">
                <button className={`${btnCss} flex ml-2 justify-center items-center`}>
                  <span className='mr-2 align-middle text-xl'><ion-icon name="contact"></ion-icon></span>Compte
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Authentification">
                <button className={`${btnCss} flex ml-2 justify-center items-center`}>
                  <span className='mr-2 align-middle text-xl'><ion-icon name="contact"></ion-icon></span>
                  <div className='flex'>
                    <p>Connexion</p>
                    <p>&nbsp;-&nbsp;</p>
                    <p>Inscription</p>
                  </div>
                </button>
              </Link>
            </>
          )}

        </div>
      </div>
      <ul className='flex justify-center flex-wrap mt-10'>
        {category.map((link) => (
          <li key={link.name} className='mx-5 text-xl text-white cursor-pointer hover:bg-white hover:bg-opacity-10 p-3 text-center'>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
    </header >
  );
};

export default Header;