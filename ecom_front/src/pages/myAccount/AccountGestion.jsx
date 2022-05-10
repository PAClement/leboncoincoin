import React from 'react';
import Footer from '../../components/includes/Footer';
import Header from '../../components/includes/Header';
import GoBack from '../../components/userAccount/GoBack';

const inputCss = "appearance-none block w-3/4 modifInput text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

const AccountGestion = () => {
  return (
    <>
      <Header />
      <section className='pl-10 accountGestion'>
        <GoBack title="change yours informations" link="../myAccount" />
        <div className='flex flex-col justify-center items-center'>
          <div class="w-2/4 flex justify-center mb-5">
            <ul class="rounded-lg w-96 text-gray-900">
              <li class="px-6 py-2 border-b border-black w-full rounded-t-lg">An item</li>
              <li class="px-6 py-2 border-b border-black w-full">A second item</li>
              <li class="px-6 py-2 border-b border-black w-full">A third item</li>
              <li class="px-6 py-2 border-b border-black w-full">A fourth item</li>
              <li class="px-6 py-2 w-full rounded-b-lg">And a fifth one</li>
            </ul>
          </div>
          <div className='w-2/4 flex flex-col justify-center items-center'>
            <input type="email" placeholder="Email" className={inputCss} />
            <input type="password" placeholder="Password" className={inputCss} />

            <div className='flex justify-between w-3/4'>
              <input type="text" placeholder="first name" className={inputCss} />
              <span className='mx-1.5'></span>
              <input type="text" placeholder="last name" className={inputCss} />
            </div>

            <input type="text" placeholder="address" className={inputCss} />

            <div className='flex justify-between w-3/4'>
              <input type="text" placeholder="cod post" className={inputCss} />
              <span className='mx-1.5'></span>
              <input type="text" placeholder="town" className={inputCss} />
            </div>

            <input type="tel" placeholder="telephone" className={inputCss} />

            <button type='submit' className={btnCss}>
              <span className='mr-2 align-middle text-xl'><ion-icon name="open"></ion-icon></span> Modifier
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AccountGestion;