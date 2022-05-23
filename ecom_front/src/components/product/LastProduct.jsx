import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const LastProduct = () => {

  const [data, setData] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {

    axios.get(`https://localhost:8000/api/product`)
      .then((res) => {

        setData(res.data);
        setLoader(false);

      }).catch((error) => {

        console.log(error);
      })
  }, [])

  return (
    <>
      <h2 className='text-2xl'>Derniers ajouts : </h2>
      <div className='mb-10 overflow-x-scroll whitespace-nowrap box-border items-baseline'>
        {loader ? (
          <div className="flex justify-center items-center mt-10 py-5">
            <div className="spinner-border animate-spin inline-block w-10 h-30 border-2 rounded-full border-black" role="status">

            </div>
            <p className='text-black ml-2'>Chargement de nos derniers produits</p>
          </div>
        ) : (
          <>
            {
              data.map((target) => (

                <Card key={target.id} product={target} />
              ))
            }
          </>
        )}
      </div>
    </>
  );
};

export default LastProduct;