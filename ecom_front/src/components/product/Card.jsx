import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {

  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  return (
    <div className="rounded-lg shadow-lg bg-white max-w-xs m-5 whitespace-normal inline-block card-product">
      <Link to={`/detail/${product.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
        <img className="rounded-t-lg max-h-52 w-full object-cover" src={`https://localhost:8000/get/image/product/${product.photo}`} alt="article-details" />
      </Link>
      <div className="px-6 pb-6 pt-1">
        <h5 className="text-gray-400 text-xs font-medium mb-2">Ref - {product.ref}</h5>
        <div className="flex justify-between">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{product.name}</h5>
          <h5 className="text-gray-900 text-xl font-medium mb-2">{product.price} €</h5>
        </div>
        <div className='flex my-2'>
          <p className='mr-2 bg-blue-700 text-white p-1 px-2 rounded'>{product.category.name}</p>
          <p className='mr-2 bg-green-700 text-white p-1 px-2 rounded'>{product.marque.name}</p>
        </div>
        <p className="text-gray-700 text-sm mb-4">
          {product.description}
        </p>
        <Link to={`/detail/${product.id}`} data-mdb-ripple="true" data-mdb-ripple-color="light">
          <button className={btnCss} style={{ cursor: "pointer" }}>
            <span className='mr-2 align-middle text-xl my-0'>
              <ion-icon name="eye"></ion-icon>
            </span>
            Voir le produit
          </button>
        </Link>
      </div>
    </div >
  );
};

export default Card;