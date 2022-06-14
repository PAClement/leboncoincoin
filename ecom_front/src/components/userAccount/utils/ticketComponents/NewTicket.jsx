import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTicket = ({ userlog }) => {


  const inputCss = "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";
  const selectCss = "form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeatborder border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  const [message, setMessage] = useState("");
  const [select, setSelect] = useState("0");

  const navigation = useNavigate();


  const onOpenTicket = (e) => {
    e.preventDefault();

    if (message != "" && select != "0") {

      axios.post('https://localhost:8000/api/newTicket', {

        customer: userlog,
        type: select,
        message
      }).then((res) => {

        setMessage("");
        setSelect("0");

        window.location.reload(true);

      }).catch((error) => {

        console.log(error)
      })
    }
  }
  return (
    <>
      <h2 className='text-3xl text-white my-10'>Création de ticket</h2>
      <form onSubmit={onOpenTicket}>
        <div className="mb-3 xl:w-96">
          <select className={selectCss} value={select} onChange={(e) => { setSelect(e.target.value) }} aria-label="Default select example">
            <option defaultValue="0">Raison de votre ticket</option>
            <option value="Problème avec une commande">Problème avec une commande</option>
            <option value="Problème avec mon compte">Problème avec mon compte</option>
            <option value="Problème avec un produit">Problème avec un produit</option>
          </select>
        </div>
        <div className="my-10 xl:w-full">
          <textarea className={inputCss} id="exampleFormControlTextarea1" rows="5" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="Your message"></textarea>
        </div>
        <button type='submit' className={btnCss}>
          <span className='mr-2 align-middle text-xl'><ion-icon name="send"></ion-icon></span>Ouvrir un ticket
        </button>
      </form>
    </>
  );
};

export default NewTicket;