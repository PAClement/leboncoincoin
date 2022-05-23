import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/includes/Footer';
import Header from '../components/includes/Header';
import CartCard from '../components/utils/CartCard';

const Cart = () => {

  const btnCss = "inline-block px-4 py-2.5  text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

  const userLog = localStorage.getItem('user');

  const [cartList, setCartList] = useState([]);

  const [loader, setLoader] = useState(true);
  const [quantityChange, setQuantityChange] = useState(false);

  const [stateTotalPrice, setStateTotalPrice] = useState(0);
  const [stateTotalProduct, setStateTotalProduct] = useState(0);

  let totalPrice = 0;
  let totalProduct = 0;


  useEffect(() => {

    axios.get(`https://localhost:8000/api/cartList/${userLog}`)
      .then((res) => {

        setLoader(false);
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


  const removeCart = (e) => {
    e.preventDefault();

    setQuantityChange(true);

    let product = e.target[1].value;
    let quantity = e.target[0].value == "up" ? (e.target[2].value++) : (e.target[2].value - 1);

    axios.post("https://localhost:8000/api/addCart", {

      product,
      customer: userLog,
      quantity
    })
      .then((res) => {

        setQuantityChange(false);
        setCartList(res.data);

      }).catch((error) => {

        console.log(error);
      })
  }

  const delCart = (e) => {
    e.preventDefault();

    setQuantityChange(true);

    let product = e.target[0].value;

    axios.delete(`https://localhost:8000/api/delete/${product}/${userLog}`)
      .then((res) => {

        setQuantityChange(false);
        setCartList(res.data);

      }).catch((error) => {

        console.log(error);
      })
  }


  return (
    <>
      <Header />
      <section className='mx-3 mt-10 flex items-start'>
        <div className='w-3/4 mr-20'>
          <p className='text-3xl border-b-2 border-gray-600 pb-3'>Votre panier</p>
          {loader ? (
            <div className="flex justify-center items-center mt-10 py-5">
              <div className="spinner-border animate-spin inline-block w-10 h-30 border-2 rounded-full border-black" role="status">

              </div>
              <p className='text-black ml-2'>Chargement de votre panier</p>
            </div>
          ) : (
            <>
              {cartList.length === 0 ? (
                <h2 className='text-red-900 text-3xl mt-10'>Aucun article dans votre panier</h2>
              ) : (
                <div className='mt-10 flex flex-col'>
                  {
                    cartList.map((target) => (

                      <div key={target.product.id} className='flex mb-10 justify-between'>

                        <CartCard cart={target} />

                        <div className={`flex flex-col ${quantityChange ? "opacity-50" : ""}`}>
                          <form onSubmit={removeCart}>
                            <input type="hidden" name='sens' value='up' />
                            <input type="hidden" name='product' value={target.product.id} />
                            <input type="hidden" name='quantity' value={target.quantity} />
                            {quantityChange ? (
                              <button type='submit' className={`${btnCss} hd-btn`} style={{ cursor: "not-allowed" }} disabled>
                                <span className='align-middle text-xl my-0'>
                                  <ion-icon name="arrow-round-up"></ion-icon>
                                </span>
                              </button>
                            ) : (
                              <button type='submit' className={`${btnCss} hd-btn`} style={{ cursor: "pointer" }}>
                                <span className='align-middle text-xl my-0'>
                                  <ion-icon name="arrow-round-up"></ion-icon>
                                </span>
                              </button>
                            )}
                          </form>

                          <p className='my-2 text-center'>{target.quantity}</p>
                          {target.quantity >= 2 &&
                            <form onSubmit={removeCart}>
                              <input type="hidden" name='sens' value='down' />
                              <input type="hidden" name='product' value={target.product.id} />
                              <input type="hidden" name='quantity' value={target.quantity} />
                              {quantityChange ? (
                                <button type='submit' className={`${btnCss} hd-btn`} style={{ cursor: "not-allowed" }} disabled>
                                  <span className='align-middle text-xl my-0'>
                                    <ion-icon name="arrow-round-down"></ion-icon>
                                  </span>
                                </button>
                              ) : (
                                <button type='submit' className={`${btnCss} hd-btn`} style={{ cursor: "pointer" }}>
                                  <span className='align-middle text-xl my-0'>
                                    <ion-icon name="arrow-round-down"></ion-icon>
                                  </span>
                                </button>
                              )}
                            </form>
                          }
                          <form onSubmit={delCart} className="mt-2">
                            <input type="hidden" name='product' value={target.product.id} />
                            {quantityChange ? (
                              <button type='submit' className={`${btnCss} trashBtn`} style={{ cursor: "not-allowed" }} disabled>
                                <span className='align-middle text-xl my-0'>
                                  <ion-icon name="trash"></ion-icon>
                                </span>
                              </button>
                            ) : (
                              <button type='submit' className={`${btnCss} trashBtn`} style={{ cursor: "pointer" }}>
                                <span className='align-middle text-xl my-0'>
                                  <ion-icon name="trash"></ion-icon>
                                </span>
                              </button>
                            )}
                          </form>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}

            </>
          )}
        </div>
        {cartList.length !== 0 &&
          <div className='w-2/4 border-l-2 border-black'>
            {loader ? (
              <div className="flex justify-center items-center mt-10 py-5">
                <div className="spinner-border animate-spin inline-block w-10 h-30 border-2 rounded-full border-black" role="status">

                </div>
                <p className='text-black ml-2'>Chargement de votre panier</p>
              </div>
            ) : (
              <div className='p-2'>
                <div>
                  <span className='italic'> Sous-total ({stateTotalProduct} article)</span>
                  <div className='my-5'></div>
                  <span className='text-2xl font-medium'>{stateTotalPrice} €</span>
                </div>
                {quantityChange ? (
                  <button type='submit' className={`${btnCss} hd-btn mt-10`} style={{ cursor: "not-allowed" }} disabled>
                    <span className='align-middle text-xl mr-2'>
                      <ion-icon name="pricetag"></ion-icon>
                    </span>
                    Passer commande
                  </button>
                ) : (
                  <Link to='/order'>
                    <button type='submit' className={`${btnCss} hd-btn mt-10`} style={{ cursor: "pointer" }}>
                      <span className='align-middle text-xl mr-2'>
                        <ion-icon name="pricetag"></ion-icon>
                      </span>
                      Passer commande
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>

        }

      </section>
      <Footer />
    </>
  );
};

export default Cart;