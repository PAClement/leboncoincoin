import React from 'react';

const TicketHistory = ({ ticket }) => {

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
    <div className='bg-white mb-5 py-3 pl-1 rounded cursor-pointer hover:border-red-600'>
      <p className='mb-3 text-orange-color font-bold'>Ticket créée le {dateParser(ticket.createdAt)}</p>
      <p className='font-semibold'>Type :  {ticket.type}</p>
    </div>
  );
};

export default TicketHistory;