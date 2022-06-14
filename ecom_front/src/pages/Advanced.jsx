import React from 'react';

const Advanced = () => {

  const inputCss = "form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer";

  return (
    <>
      <section className='flex items-start'>
        <div className='w-1/4 bgColor2 py-5 pb-32'>
          <h2 className='text-4xl text-center text-white mt-5'>FILTER BY</h2>
          <ul className='mt-16 text-white pl-10'>
            <li>
              <h2 className='text-2xl mb-5'>Current category :</h2>
              <p className='ml-3'>- Name of category</p>
            </li>
            <li className='mt-10'>
              <h2 className='text-2xl mb-5'>Price :</h2>
              <ul>
                <li>
                  <input className={inputCss} type="radio" name="price" id="allprice" />
                  <label className="form-check-label inline-block text-white mb-3" for="allprice">
                    Tous les prix
                  </label>
                </li>
                <li>
                  <input className={inputCss} type="radio" name="price" id="firstPrice" />
                  <label className="form-check-label inline-block text-white mb-3" for="firstPrice">
                    Jusqu'à 20 EUR
                  </label>
                </li>
                <li>
                  <input className={inputCss} type="radio" name="price" id="thirdPrice" />
                  <label className="form-check-label inline-block text-white mb-3" for="thirdPrice">
                    20 à 50€
                  </label>
                </li>
                <li>
                  <input className={inputCss} type="radio" name="price" id="firthPrice" />
                  <label className="form-check-label inline-block text-white mb-3" for="firthPrice">
                    50 à 100€
                  </label>
                </li>
                <li>
                  <input className={inputCss} type="radio" name="price" id="fifthPrice" />
                  <label className="form-check-label inline-block text-white mb-3" for="fifthPrice">
                    100 à 200€
                  </label>
                </li>
              </ul>
            </li>
            <li className='mt-10'>
              <h2 className='text-2xl mb-5'>Order by :</h2>
              <ul>
                <li>
                  <input className={inputCss} type="radio" name="order" id="normal" />
                  <label className="form-check-label inline-block text-white mb-3" for="normal">
                    Normal
                  </label>
                </li>
                <li>
                  <input className={inputCss} type="radio" name="order" id="descending" />
                  <label className="form-check-label inline-block text-white mb-3" for="descending">
                    Descending
                  </label>
                </li>
                <li>
                  <input className={inputCss} type="radio" name="order" id="croissant" />
                  <label className="form-check-label inline-block text-white mb-3" for="croissant">
                    Croissant
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='flex justify-center flex-wrap w-3/4'>
        </div>
      </section>
    </>
  );
};

export default Advanced;