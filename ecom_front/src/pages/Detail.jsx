import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCart from '../components/product/AddCart';
import Loader from '../components/utilsGlobal/Loader';

const Detail = () => {

  const user = localStorage.getItem('user');
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);

  let { id } = useParams();


  useEffect(() => {

    axios.get(`https://localhost:8000/api/oneProduct/${id}`)
      .then((res) => {

        setData(res.data);
        setLoader(false);

      }).catch((error) => {

        console.log(error);
      })
  }, [])

  return (
    <>
      <section className='mt-10 mx-52 flex detail'>
        {loader ? (
          <Loader title="Chargement du produit" />
        ) : (
          <>
            <div className='flex justify-center mr-10 w-2/5'>
              <img src={`https://localhost:8000/get/image/product/${data.photo}`} alt="" />
            </div>
            <div className='w-8/12 flex flex-col justify-evenly'>
              <div>
                <h2 className='text-3xl font-bold mb-10'>{data.name}</h2>
                {data.quantity > 0 ? (

                  <h4 className='text-green-800'>En stock </h4>
                ) : (

                  <h4 className='text-red-800'>Épuisé - Bientôt en stock !</h4>
                )}
                <h3 className='text-2xl mb-5'>{data.price} €</h3>
                <div className='flex mb-10'>
                  <p className='mr-2 bg-blue-700 text-white p-1 px-2 rounded'>{data.category.name}</p>
                  <p className='mr-2 bg-green-700 text-white p-1 px-2 rounded'>{data.marque.name}</p>
                </div>
                <p className='mb-5'>
                  {data.description}
                </p>
              </div>
              {user ? (
                <>
                  <AddCart key={data.id} product={data.id} />
                </>
              ) : (
                <>
                  <h4 className='font-bold'>Un compte est nécessaire afin d'ajouter un produit au panier</h4>
                </>
              )}
            </div>
          </>
        )}

      </section>
    </>
  );
};

export default Detail;