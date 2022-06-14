import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardUserOrder from './utils/CardUserOrder';

import Loader from '../utilsGlobal/Loader';
const UserOrder = () => {

  const userLog = localStorage.getItem('user');

  const [orderData, setOrderData] = useState([]);
  const [loader, setLoader] = useState(true);

  let $orderReverse = [];

  useEffect(() => {

    axios.get(`https://localhost:8000/api/userOrder/${userLog}`).then((res) => {

      $orderReverse = res.data.reverse();
      setOrderData($orderReverse);
      setLoader(false);
    }).catch((error) => {

      console.log(error);
    })

  }, [])

  return (
    <>
      <section className=' accountGestion flex justify-center'>
        <div className='account-panel p-10 w-full px-52'>
          <h2 className='text-3xl text-white mb-10'>Liste de vos commandes</h2>
          {loader ? (
            <Loader title="Chargement de vos commandes" color="white" />
          ) : (
            <>
              {
                orderData.map((target) => (

                  <CardUserOrder key={target.id} order={target} />
                ))
              }
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default UserOrder;