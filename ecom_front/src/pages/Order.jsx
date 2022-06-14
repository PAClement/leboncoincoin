import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from '../components/utilsGlobal/CartCard';
import Loader from '../components/utilsGlobal/Loader';

const Order = () => {

  let radioCss = "form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer";
  let btnCss = "inline-block px-4 py-2.5  text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  const userLog = localStorage.getItem('user');

  const [transporteur, setTransporteur] = useState([]);
  const [cartList, setCartList] = useState([]);

  const [loaderTransporteur, setLoaderTransporteur] = useState(true);
  const [loaderProduct, setLoaderProduct] = useState(true);

  const [radioTransporteur, setRadioTransporteur] = useState("Notre Transporteur");
  const [radioLivraison, setRadioLivraison] = useState("A domicile");

  const [stateTotalPrice, setStateTotalPrice] = useState(0);
  const [stateTotalProduct, setStateTotalProduct] = useState(0);

  const navigation = useNavigate();

  let totalPrice = 0;
  let totalProduct = 0;

  useEffect(() => {

    axios.get("https://localhost:8000/api/transporteur").then((res) => {

      setLoaderTransporteur(false);
      setTransporteur(res.data);

    }).catch((error) => {

      console.log(error);
    })

    axios.get(`https://localhost:8000/api/cartList/${userLog}`)
      .then((res) => {

        setLoaderProduct(false);
        setCartList(res.data);
      }).catch((error) => {

        console.log(error);
      })
  }, [])

  useEffect(() => {

    if (cartList.length > 0) {

      cartList.map((target) => {

        totalPrice += target.product.price * target.quantity;
        totalProduct += target.quantity;
      })

      setStateTotalPrice(totalPrice);
      setStateTotalProduct(totalProduct);
    }

  }, [cartList])

  const createOrder = () => {

    axios.post("https://localhost:8000/api/createOrder", {

      customer: userLog,
      transporteur: radioTransporteur,
      mode: radioLivraison,
    })
      .then((res) => {

        navigation('/myAccount/userOrder');

      }).catch((error) => {

        console.log(error);
      })


  }

  return (
    <>
      <section className='mx-20 mt-10'>
        <div className='flex justify-between'>
          <div>
            <h2 className='text-3xl'>1 - Choisir votre transporteur</h2>
            <div className='py-10'>
              {loaderTransporteur ? (
                <Loader title="Chargement de nos transporteurs" />
              ) : (
                <>
                  {
                    transporteur.map((target) => (
                      <div className="form-check flex items-center" key={target.id}>
                        <input className={radioCss} value={target.name} type="radio" name='transporteur' id={target.id + `_transporteur`} checked={target.name === radioTransporteur} onChange={(e) => setRadioTransporteur(e.target.value)} />
                        <label className="flex items-center pl-10 mb-5" id={target.id + `_transporteur`} htmlFor={target.id + `_transporteur`}>
                          <img className="rounded-lg h-20 w-20 object-cover" src={`https://localhost:8000/get/image/transporteur/${target.logo}`} alt="article-details" />
                          <h3 className='pl-10 text-xl'>{target.name}</h3>
                        </label>
                      </div>
                    ))
                  }
                </>
              )}
            </div>
          </div>
          <div>
            <h2 className='text-3xl'>2 - Mode de livraison</h2>
            <div className="flex-col py-10">
              <div className="form-check">
                <input className={radioCss} type="radio" name="mode" id="domicile" value="A domicile" onChange={(e) => setRadioLivraison(e.target.value)} checked={"A domicile" === radioLivraison} />
                <label className="form-check-label inline-block text-gray-800 text-xl pl-10 mb-5" id="domicile" htmlFor="domicile">
                  A domicile
                </label>
              </div>
              <div className="form-check">
                <input className={radioCss} type="radio" name="mode" id="Point relais" value="Point relais" onChange={(e) => setRadioLivraison(e.target.value)} checked={"Point relais" === radioLivraison} />
                <label className="form-check-label inline-block text-gray-800 text-xl pl-10" id="Point relais" htmlFor="Point relais">
                  Point Relais
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div>
            <h2 className='text-3xl'>3- Vérification et validation de votre commande</h2>
            <div className='py-10'>
              {loaderProduct ? (
                <Loader title="Chargement de vos produits" />
              ) : (
                <>
                  {
                    cartList.map((target) => (
                      <div key={target.product.id} className='flex mb-10 justify-between'>
                        <CartCard cart={target} />
                        <p className='my-2 text-center'>Quantité : {target.quantity}</p>
                      </div>
                    ))
                  }
                </>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <span className='italic'> Sous-total ({stateTotalProduct} article)</span>
            <div className='my-5'></div>
            <span className='text-2xl font-medium'>{stateTotalPrice} €</span>
            <button type='submit' className={`${btnCss} hd-btn mt-10`} style={{ cursor: "pointer" }} onClick={createOrder}>
              <span className='align-middle text-xl mr-2'>
                <ion-icon name="pricetag"></ion-icon>
              </span>
              Passer commande
            </button>
          </div>
        </div>
      </section >
    </>
  );
};

export default Order;