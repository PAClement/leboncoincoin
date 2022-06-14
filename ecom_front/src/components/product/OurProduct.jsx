import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../utilsGlobal/Loader';
import Card from './Card';

const OurProduct = () => {

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
      <h2 className='text-2xl'>Nos articles : </h2>
      <div className='flex justify-center flex-wrap'>
        {loader ? (
          <Loader title="Chargement de nos articles" />
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

export default OurProduct;