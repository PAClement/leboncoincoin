import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';


const CardUserOrder = ({ order }) => {

  const [priceGlobalCommande, setPriceGlobalCommande] = useState(0);

  const [stateCommandeCss, setStateCommandeCss] = useState("");

  let priceCommande = 0;

  useEffect(() => {

    if (order.state == "En préparation") {

      setStateCommandeCss("text-orange-700");
    } else if (order.state == "Livrée") {

      setStateCommandeCss("text-green-700");
    }

    for (let i = 0; i < order.orderDetails.length; i++) {

      priceCommande += order.orderDetails[i].price * order.orderDetails[i].quantity;
    }

    setPriceGlobalCommande(priceCommande);
  }, [])

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    return newDate;
  };

  return (
    <>
      <div className='bg-white-sass pl-2 py-5 pr-5 my-2 rounded shadow-xl'>
        <div className="flex justify-between">
          <h3 className='mb-5 text-2xl '>Commande du {dateParser(order.date)}</h3>
          <h5 className='text-xl'>{priceGlobalCommande} €</h5>
        </div>
        <div className='flex justify-between mb-5'>
          <p>
            <span className='font-bold'>Commande </span>
            <span className={stateCommandeCss}>{order.state}</span>
          </p>
          <p><span className='font-bold'>Livraison :  </span>{order.mode}</p>
        </div>
        <Collapsible trigger="Detail de la commande">
          <div className='flex items-center my-5'>
            <h5 className='text-xl mr-2'>Transporteur : </h5>
            <img className='rounded-lg h-10 w-10 object-cover' src={`https://localhost:8000/get/image/transporteur/${order.transporteur.logo}`} alt="article-details" />
            <h5 className='ml-5 text-l'>
              {order.transporteur.name}
            </h5>
          </div>
          <h6 className='text-xl'>Liste des produits :</h6>
          {
            order.orderDetails.map((target) => (
              <div className='flex my-5' key={target.id}>
                <img className='rounded-lg h-32 w-32 object-cover' src={`https://localhost:8000/get/image/product/${target.product.photo}`} alt="article-details" />
                <div className='flex-col ml-2'>
                  <h5 className='text-gray-400 text-xs font-medium mb-2'>Ref_{target.product.ref}</h5>
                  <h5 className='text-xl text-orange-color mb-5'>{target.product.name}</h5>
                  <p className='text-sm'>Prix de l'article : {target.price} €</p>
                  <p className='text-sm'>Quantité : {target.quantity}</p>
                </div>
              </div>
            ))
          }
        </Collapsible>
      </div>
    </>
  );
};


export default CardUserOrder;