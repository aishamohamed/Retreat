import React, { useState, useEffect } from 'react';
import Ticket from '../components/ticket';
import "../style/cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          const parsedCartItems = JSON.parse(storedCartItems);
          const inCart = Object.keys(parsedCartItems).map(key => ({ _id: key }));

          fetch('http://localhost:3500')
            .then(response => response.json())
            .then(data => {
              data = data.filter((ticket) => inCart.some(cartItem => cartItem._id === ticket._id));
              setCartItems(data);
            })
            .catch(error => console.error('Error fetching tickets:', error));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  
  const removeFromCart = async (itemId) => {
    try {
      // Update local storage
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
          const parsedCartItems = JSON.parse(storedCartItems);
          delete parsedCartItems[itemId];
          localStorage.setItem('cartItems', JSON.stringify(parsedCartItems));
      }
      
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
};
  
  const purchaseCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if(token) {
        localStorage.setItem('cartItems', JSON.stringify({}));
        setCartItems([]);
        alert('Purchase successful');
      } else {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error purchasing cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(({ _id, type, price, currency, daysValid, location }) => (
            <Ticket
              id={_id}
              type={type}
              price={price}
              currency={currency}
              daysValid={daysValid}
              location={location}
              inCart={true}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
      )}
      {cartItems.length > 0 ? (
        <button onClick={purchaseCart}>Purchase</button>
      ) : ""}
    </div>
  );
}

export default Cart;
