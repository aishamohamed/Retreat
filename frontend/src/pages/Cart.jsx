/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Ticket from '../components/ticket';
import "../style/cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentData, setPaymentData] = useState({
    method: '',
    paypalEmail: '',
    paypalPassword: '',
    cardNumber: '',
    cardExpirationDate: '',
    cardCVV: ''
  });
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);

  useEffect(() => {
    // is user  logged in
    const userLoggedIn = localStorage.getItem('token'); 

    // Redirect to login page if  not logged in
    if (!userLoggedIn) {
      window.location.href = '/login';
    } else {
      //  fetch cart items if user is logged in
      fetchCartItems();
    }
  }, []);

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

  const removeFromCart = async (itemId) => {
    try {
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

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setPaymentData({ ...paymentData, method: value });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleProceedToPayment = () => {
    if (paymentData.method === '') {
      alert('Please select a payment method');
      return;
    }
    setIsPaymentFormVisible(true);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          <div>
            {cartItems.map(({ _id, type, price, currency, daysValid, location }) => (
              <Ticket
                key={_id}
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
          <div>
            <h3>Total: {calculateTotal()}</h3>
            <div>
              <label htmlFor="paymentMethod">Select Payment Method:</label>
              <select id="paymentMethod" value={paymentData.method} onChange={handlePaymentMethodChange}>
                <option value="">Select...</option>
                <option value="paypal">PayPal</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
              </select>
            </div>
            <button onClick={handleProceedToPayment}>Proceed to Payment</button>
          </div>
          {isPaymentFormVisible && (
            <div>
              {}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Your cart is empty</p>
        </div>
      )}
    </div>
  );
}

export default Cart;







 


























