import axios from 'axios';
import React from 'react';

const AddCart = ({ product }) => {

  let productId = product;

  const userLog = localStorage.getItem('user');

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

    console.log(productId);
  }

  return (
    <>
      <div className='flex'>
        <form onSubmit={addCart}>
          <button type="submit" className=" mr-5 inline-block px-6 py-2.5 cartBtn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
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