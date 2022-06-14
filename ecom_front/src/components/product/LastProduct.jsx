import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../utilsGlobal/Loader';
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
          <Loader title="Chargement de nos derniers produits" />
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