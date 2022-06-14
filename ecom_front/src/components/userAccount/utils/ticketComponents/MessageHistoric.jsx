import React from 'react';

const MessageHistoric = ({ message }) => {

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });

    return newDate;
  };
  return (
    <>
      {
        message.map((messageHistoric) => (
          <div key={messageHistoric.id}>
            {messageHistoric.isCustomer ? (
              <div className='flex flex-col items-start my-1'>
                <div className='bg-green-800 w-2/4 p-2 rounded'>
                  <p className='text-white' key={messageHistoric.id}>{messageHistoric.message}</p>
                </div>
                <h2 className='text-gray text-sm text-gray-600'>Envoyé le {dateParser(messageHistoric.sendAt)}</h2>
              </div>
            ) : (
              <div className='flex flex-col items-end my-1'>
                <div className='bg-red-800 w-2/4 p-2 rounded'>

                  <p className='text-white'>{messageHistoric.message}</p>
                </div>
                <h2 className='text-gray text-sm text-gray-600'>Envoyé le {dateParser(messageHistoric.sendAt)}</h2>
              </div>
            )}
          </div>
        ))
      }
    </>
  );
};

export default MessageHistoric;