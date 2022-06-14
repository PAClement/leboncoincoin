import axios from 'axios';
import React, { useState } from 'react';

const AddCart = ({ product }) => {

  let productId = product;

  const userLog = localStorage.getItem('user');

  const [isOk, setIsOk] = useState(false);

  const addCart = (e) => {
    e.preventDefault();

    axios.post("https://localhost:8000/api/addCart", {

      product: productId,
      customer: userLog,
      quantity: 1
    })
      .then((res) => {


      }).catch((error) => {

        console.log(error);
      })

  }

  const addWishlist = (e) => {
    e.preventDefault();

    axios.post("https://localhost:8000/api/addWishlist", {

      product: productId,
      customer: userLog
    })
      .then((res) => {

        if (res.data.status === "exist") {

          setIsOk(true)
          setTimeout(function () { setIsOk(false) }, 2000);
        }

      }).catch((error) => {

        console.log(error);
      })

  }

  return (
    <>
      <div className='flex'>
        {isOk && (
          <div className="mt-20 bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md absolute" role="alert">
            <div className="flex justify-center">
              <div>
                <p className="font-bold">Article déjà présent dans votre Wishlist</p>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={addCart}>
          <button type="submit" className="mr-5 inline-block px-6 py-2.5 cartBtn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
            <span className='text-xl mr-2 align-middle'>
              <ion-icon name="cart"></ion-icon>
            </span>
            Add to cart
          </button>
        </form>
        <form onSubmit={addWishlist}>
          <button type="submit" className='inline-block px-6 py-2.5 wishBtn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'>
            <span className='text-xl'>
              <ion-icon name="heart"></ion-icon>
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCart;