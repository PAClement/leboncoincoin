import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const AccountGestion = () => {

  const inputCss = "appearance-none block w-full bg-gray-200 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  const [isEdit, setIsEdit] = useState(false);

  const userLog = localStorage.getItem('user');

  const [isOk, setIsOk] = useState(false);

  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [tel, setTel] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [loader, setLoader] = useState(true);

  useEffect(() => {

    axios.get(`https://localhost:8000/api/oneCustomer/${userLog}`)
      .then((res) => {

        setCreatedAt(dateParser(Date.parse(res.data.createdAt)));

        setName(res.data.name);
        setFirstName(res.data.firstName);
        setAddress(res.data.address);
        setCity(res.data.city);
        setPostalCode(res.data.postalCode);
        setTel(res.data.tel);

        setLoader(false);

      }).catch((error) => {

        console.log(error);
      })

  }, [isEdit])

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });

    return newDate;
  };


  const handleForm = (e) => {

    e.preventDefault();

    axios.put("https://localhost:8000/api/customer_edit", {

      name,
      firstName,
      address,
      city,
      postalCode,
      tel,
      uuid: userLog

    }).then((res) => {

      if (res.data === "Vos informations ont bien été modifiées") {

        setIsEdit(false);
        setIsOk(true)
        setTimeout(function () { setIsOk(false) }, 2000);

      }

    }).catch((error) => {

      console.log(error);
    })
  }

  const logout = () => {
    localStorage.removeItem('user');

  }

  return (
    <section className=' accountGestion flex justify-center'>
      {isOk && (
        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md my-10 absolute" role="alert">
          <div className="flex justify-center">
            <div>
              <p className="font-bold">Vos informations ont bien été modifiées</p>
            </div>
          </div>
        </div>
      )}

      <div className='account-panel p-10 w-full px-52'>
        <Link to="/Authentification">
          <button onClick={logout} className={`${btnCss} trashBtn`} style={{ cursor: "pointer" }}>
            <span className='align-middle text-xl mr-2'>
              <ion-icon name="git-compare"></ion-icon>
            </span>
            Me déonnecter
          </button>
        </Link>
        <h2 className='orange-title text-center text-2xl mb-5'>Informations personnelles</h2>

        {loader ? (
          <div className="flex justify-center items-center mt-10">
            <div className="spinner-border animate-spin inline-block w-10 h-30 border-4 rounded-full" role="status">

            </div>
            <p className='text-white ml-2'>Loading</p>
          </div>
        ) : (
          <>
            <div className='text-center'>
              <p className='mb-10 text-white text-xl'>Compte crée le : {createdAt}</p>
              <button onClick={() => isEdit ? setIsEdit(false) : setIsEdit(true)} className={` mb-10 ${btnCss}`}>
                <span className='mr-2 align-middle text-xl'>
                  <ion-icon name={isEdit ? "hand" : "create"}></ion-icon>
                </span>
                {isEdit ? "Arrêter l'édition" : "Modifier mes informations"}
              </button>
            </div>

            {isEdit ? (
              <form onSubmit={handleForm}>
                <div className='flex justify-between w-full'>
                  <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} className={inputCss} />
                  <span className='mx-1.5'></span>
                  <input type="text" onChange={(e) => setName(e.target.value)} value={name} className={inputCss} />
                </div>

                <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} className={inputCss} />

                <div className='flex justify-between w-full'>
                  <input type="text" onChange={(e) => setPostalCode(e.target.value)} value={postalCode} className={inputCss} />
                  <span className='mx-1.5'></span>
                  <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className={inputCss} />
                </div>

                <input type="tel" onChange={(e) => setTel(e.target.value)} value={tel} className={inputCss} />
                <button type='submit' className={btnCss}>
                  <span className='mr-2 align-middle text-xl'><ion-icon name="create"></ion-icon></span>Editer mes informations
                </button>
              </form>

            ) : (
              <>
                <div className='border-y-2 py-2'>
                  <div className='flex justify-between w-full'>
                    <p className='py-3 px-4 text-white text-xl mb-3 border-2 border-transparent'>{firstName}</p>
                    <span className='mx-1.5'></span>
                    <p className='py-3 px-4 text-white text-xl mb-3 border-2 border-transparent'>{name}</p>
                  </div>

                  <p className='py-3 px-4 text-white text-xl mb-3 border-2 border-transparent'>{address}</p>

                  <div className='flex justify-between w-full'>
                    <p className='py-3 px-4 text-white text-xl mb-3 border-2 border-transparent'>{postalCode}</p>
                    <span className='mx-1.5'></span>
                    <p className='py-3 px-4 text-white text-xl mb-3 border-2 border-transparent'>{city}</p>
                  </div>

                  <p className='py-3 px-4 text-white text-xl mb-3 border-2 border-transparent'>{tel}</p>
                </div>
              </>
            )}
          </>
        )}


      </div>
    </section >
  );
};

export default AccountGestion;