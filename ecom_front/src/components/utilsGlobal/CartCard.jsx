import React from 'react';
import { Link } from 'react-router-dom';

const CartCard = ({ cart }) => {


  return (
    <div className='flex'>
      <Link to={`/detail/${cart.product.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
        <div className='mr-5'>
          <img className="rounded-lg h-52 w-52 object-cover" src={`https://localhost:8000/get/image/product/${cart.product.photo}`} alt="article-details" />
        </div>
      </Link>
      <div className='flex flex-col'>
        <h5 className="text-gray-400 text-xs font-medium mb-2">Ref - {cart.product.ref}</h5>
        <Link to={`/detail/${cart.product.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
          <h2 className='text-2xl'>{cart.product.name}</h2>
        </Link>
        {cart.product.quantity > 0 ? (<h4 className='text-green-800 my-5'>En stock </h4>) : (<h4 className='text-red-800 my-5'>Épuisé - Bientôt en stock !</h4>)}
        <h4 className='text-xl'>{cart.product.price} €</h4>
        <div className='flex mt-5'>
          <p className='mr-2 bg-blue-700 text-white p-1 px-2 rounded'>{cart.product.category.name}</p>
          <p className='mr-2 bg-green-700 text-white p-1 px-2 rounded'>{cart.product.marque.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;