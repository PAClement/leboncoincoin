import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import NewTicket from './utils/ticketComponents/NewTicket';
import MessageHistoric from './utils/ticketComponents/MessageHistoric';
import TicketHistory from './utils/ticketComponents/TicketHistory';
import Loader from '../utilsGlobal/Loader';


const Ticket = () => {

  const userLog = localStorage.getItem('user');

  const btnCss = "inline-block px-6 py-2.5 hd-btn text-white font-medium text-l leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";
  const inputCss = "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  const [newTicket, setNewTicket] = useState(false);
  const [ticketData, setTicketData] = useState([]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [currentTicket, setCurrentTicket] = useState(0);
  const [playOnce, setPlayOnce] = useState(true);

  const [loader, setLoader] = useState(true);

  useEffect(() => {

    if (!newTicket) {

      axios.get(`https://localhost:8000/api/getTicket/${userLog}`).then((res) => {

        res.data.reverse();
        setTicketData(res.data);
        setLoader(false);

        if (playOnce) {

          setCurrentTicket(res.data[0].id);
          setPlayOnce(false);
        }
      }).catch((error) => {

        console.log(error);
      })
    }

    setCurrentMessage("");

  }, [newTicket, currentTicket])

  const onSendMessage = () => {

    if (currentMessage.length != 0) {

      axios.post("https://localhost:8000/api/addCustomerResponse", {

        customer: userLog,
        message: currentMessage,
        ticket: currentTicket
      }).then((res) => {

        res.data.reverse();
        setTicketData(res.data);
        setCurrentMessage("");
      }).catch((error) => {

        console.log(error);
      })
    }
  }
  return (
    <>
      <section className=' accountGestion flex justify-center'>
        <div className='account-panel message p-10 w-full px-24'>
          {newTicket ? (
            <>
              <button type='submit' onClick={() => { setNewTicket(false) }} className={btnCss}>
                <span className='mr-2 align-middle text-xl'><ion-icon name="arrow-back"></ion-icon></span>Voir mes tickets
              </button>
              <NewTicket userlog={userLog} />
            </>
          ) : (
            <>
              <button type='submit' onClick={() => { setNewTicket(true) }} className={btnCss}>
                <span className='mr-2 align-middle text-xl'><ion-icon name="create"></ion-icon></span>Créer un ticket
              </button>
              {loader ? (

                <Loader title="Chargement de vos tickets" color="white" />
              ) : (
                <>
                  {ticketData.length === 0 ? (

                    <h2 className='text-red-700 text-2xl mt-10 text-center'>Vous n'avez aucun ticket pour le moment</h2>
                  ) : (

                    <Tabs>
                      <div className='flex mt-10'>
                        <div className='list-message w-2/4 pr-3 overflow-auto'>
                          <TabList>
                            {ticketData.map((target) => (
                              <Tab key={target.id}>
                                <a onClick={() => setCurrentTicket(target.id)}>
                                  <TicketHistory ticket={target} />
                                </a>
                              </Tab>
                            ))}
                          </TabList>
                        </div>
                        <div className='ml-5  w-3/4'>
                          <div id='chat' className='list-message h-96 bg-white rounded p-3 overflow-auto'>
                            {ticketData.map((target) => (
                              <TabPanel key={target.id}>
                                <MessageHistoric message={target.historical} />
                              </TabPanel>
                            ))}
                          </div>
                          <div className='mt-5'>
                            <textarea className={inputCss} onChange={(e) => { setCurrentMessage(e.target.value) }} value={currentMessage} rows="3" placeholder="Your message"></textarea>
                            <button onClick={onSendMessage} type='submit' className={`${btnCss} mt-5`}>
                              <span className='mr-2 align-middle text-xl'><ion-icon name="send"></ion-icon></span>Envoyer
                            </button>
                          </div>
                        </div>
                      </div>
                    </Tabs>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Ticket;