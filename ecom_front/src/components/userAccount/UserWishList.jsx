import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../utilsGlobal/Loader';

import { Link } from 'react-router-dom';

const UserWishList = () => {

  const userLog = localStorage.getItem('user');

  const [orderData, setOrderData] = useState([]);
  const [loader, setLoader] = useState(true);

  let $orderReverse = [];

  useEffect(() => {

    axios.get(`https://localhost:8000/api/userWishlist/${userLog}`).then((res) => {

      $orderReverse = res.data.reverse();
      setOrderData($orderReverse);
      setLoader(false);
    }).catch((error) => {

      console.log(error);
    })
  }, [])

  const wishDelete = (e) => {

    e.preventDefault();

    let product = e.target[0].value;

    axios.delete(`https://localhost:8000/api/deleteWishlist/${product}/${userLog}`)
      .then((res) => {

        $orderReverse = res.data.reverse();
        setOrderData($orderReverse);

      }).catch((error) => {

        console.log(error);
      })

  }

  return (
    <section className=' accountGestion flex justify-center'>
      <div className='account-panel p-10 w-full px-52'>
        <h2 className='text-3xl text-white mb-10'>Votre Wishlist</h2>
        {loader ? (
          <Loader title="Chargement de votre wishlist" color="white" />
        ) : (
          <>
            {orderData.length === 0 ? (
              <h2 className='text-red-700 text-2xl mt-10'>Aucun article dans votre wishlist</h2>
            ) : (
              <>
                {
                  orderData.map((target) => (
                    <div className='flex justify-between' key={target.product.id}>
                      <div className='flex my-5'>
                        <img className='rounded-lg h-52 w-52 object-cover' src={`https://localhost:8000/get/image/product/${target.product.photo}`} alt="article-details" />
                        <div className='flex-col ml-2'>
                          <h5 className='text-gray-400 text-xs font-medium mb-2'>Ref_{target.product.ref}</h5>
                          <h5 className='text-2xl text-orange-color mb-5'>{target.product.name}</h5>
                          {target.product.quantity > 0 ? (

                            <h4 className='text-green-800'>En stock </h4>
                          ) : (

                            <h4 className='text-red-800'>Épuisé - Bientôt en stock !</h4>
                          )}
                          <p className='text-xl text-white'>Prix de l'article : {target.product.price} €</p>
                        </div>
                      </div>
                      <div className='flex flex-col justify-center'>
                        <Link to={`/detail/${target.product.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
                          <button className="w-full mb-5 hd-btn inline-block px-6 py-2.5 text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ cursor: "pointer" }}>
                            <span className='mr-2 align-middle text-xl my-0'>
                              <ion-icon name="eye"></ion-icon>
                            </span>
                            Voir le produit
                          </button>
                        </Link>
                        <form onSubmit={wishDelete} className="mt-2">
                          <input type="hidden" name='product' value={target.product.id} />
                          <button className="inline-block px-6 py-2.5 text-white bg-red-700 hover:bg-red-900 font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ cursor: "pointer" }}>
                            <span className='mr-2 align-middle text-xl my-0'>
                              <ion-icon name="trash"></ion-icon>
                            </span>
                            Supprimer Produit
                          </button>
                        </form>
                      </div>
                    </div>
                  ))
                }
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default UserWishList;