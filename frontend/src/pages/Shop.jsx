/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Ticket from '../components/ticket';

function Shop() {
  const [tickets, setTickets] = useState([]);
  const [cartMessage, setCartMessage] = useState('');
  const [addedToCart, setAddedToCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3500')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  const addToCart = async (ticketId) => {
    try {
      await fetch('http://localhost:3500/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ticketId })
      });
      setCartMessage('Item added to cart');
      setAddedToCart([...addedToCart, ticketId]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setCartMessage('Failed to add item to cart');
    }
  };

  const isAddedToCart = (ticketId) => {
    return addedToCart.includes(ticketId);
  };

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
