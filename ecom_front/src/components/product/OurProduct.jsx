import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
          <div className="flex justify-center items-center mt-10 py-5">
            <div className="spinner-border animate-spin inline-block w-10 h-30 border-2 rounded-full border-black" role="status">

            </div>
            <p className='text-black ml-2'>Chargement de nos articles</p>
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

export default OurProduct;