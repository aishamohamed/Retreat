/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Ticket from '../components/ticket';

function Shop() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const storedCartItems = localStorage.getItem('cartItems');
      const cartItems = JSON.parse(storedCartItems) || {};

      fetch('http://localhost:3500')
        .then(response => response.json())
        .then(data => {
          data.map((ticket) => ticket.inCart = cartItems[ticket._id] ? true : false);
          setTickets(data);
        })
        .catch(error => console.error('Error fetching tickets:', error));
    }

    fetchItems();
  }, []);

  return (

    <div className='shop'>
      {tickets.map(({_id,type,price,currency,daysValid,location,inCart}) =>
      <Ticket
      id={_id}
      type={type}
      price={price}
      currency={currency}
      daysValid={daysValid}
      location={location}
      inCart={inCart}
      removeFromCart={undefined}
      /> )}     
    </div>
  );
}

export default Shop;
