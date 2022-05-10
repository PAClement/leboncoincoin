import React from 'react';

const Header = () => {

  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";


  let Links = [
    { name: "CATEGORY 1" },
    { name: "CATEGORY 2" },
    { name: "CATEGORY 3" },
    { name: "CATEGORY 4" },
    { name: "CATEGORY 5" }
  ];

  return (
    <header className='bgColor2 shadow-md w-full top-0 left-0 p-3 pb-0'>
      <div className='flex items-end w-full'>
        <a className='flex items-end w-3/12' href='/'>
          <img src={window.location.origin + '/img/logo.png'} className='logo' alt='our_logo' />
          <h1 className='text-white text-4xl ml-5'>Le Bon CoinCoin</h1>
        </a>
        <div className='flex mb-2 w-9/12 justify-between h-12'>
          <div className='flex w-6/12 2xl:w-8/12'>
            <input type="search" className="form-control block w-full h-12 px-4 py-2 text-xl text-gray-700 bg-white border  rounded-r-none rounded-l-md border-r-0 transition ease-in-out m-0 focus:text-gray-700 focus:outline-none" placeholder="Search" />
            <a href="/advanced">
              <button className='form-control h-12 inline-block px-6 py-2.5 bg-white text-black text-xl leading-tight uppercase rounded-t-none rounded-r-md border-l-0 focus:ring-0 transition duration-150 ease-in-out'>
                <ion-icon name="search"></ion-icon>
              </button>
            </a>
          </div>
          <button className={btnCss}>
            <span className='mr-2 align-middle text-xl'><ion-icon name="cart"></ion-icon></span> Cart
          </button>
          <a href="/myAccount">
            <button className={btnCss}>
              <span className='mr-2 align-middle text-xl'><ion-icon name="contact"></ion-icon></span> My account
            </button>
          </a>
        </div>
      </div>
      <ul className='flex justify-center mt-10'>
        {Links.map((link) => (
          <li key={link.name} className='mx-5 text-xl text-white cursor-pointer hover:bg-white hover:bg-opacity-10 p-3'>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
    </header >
  );
};

export default Header;