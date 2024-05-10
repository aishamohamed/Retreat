/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Ticket from '../components/ticket';

function Shop() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3500')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  return (

    <div className='shop'>
      {tickets.map(({id,type,price,currency,daysValid,location}) =>
      <Ticket
      key={id}
      type={type}
      price={price}
      currency={currency}
      daysValid={daysValid}
      location={location}
      /> )}     
    </div>
  );
}

export default Shop;
