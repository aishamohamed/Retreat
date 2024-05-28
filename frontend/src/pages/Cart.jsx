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
  const [isPaymentMethodVisible, setIsPaymentMethodVisible] = useState(false);
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('token');
    if (!userLoggedIn) {
      window.location.href = '/login';
    } else {
      fetchCartItems();
    }
  }, []);

  const fetchCartItems = async () => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        const parsedCartItems = JSON.parse(storedCartItems);
        const inCart = Object.keys(parsedCartItems).map(key => ({ _id: key }));

        fetch('https://retreat-backend-wh82.onrender.com/')
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
    setIsPaymentFormVisible(true);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleProceedToCheckout = () => {
    setIsPaymentMethodVisible(true);
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Handle payment submission logic here

    // Simulating payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment processed successfully!');
      setCartItems([]);
      setPaymentData({
        method: '',
        paypalEmail: '',
        paypalPassword: '',
        cardNumber: '',
        cardExpirationDate: '',
        cardCVV: ''
      });
      setIsPaymentMethodVisible(false);
      setIsPaymentFormVisible(false);
      localStorage.removeItem('cartItems');
    }, 2000);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          <div className="ticket-list">
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
          <div className="total-section">
            <p>Total: {calculateTotal()}</p>
            {!isPaymentMethodVisible && (
              <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            )}
            {isPaymentMethodVisible && (
              <div>
                <div className="payment-method-select">
                  <label htmlFor="paymentMethod">Select Payment Method:</label>
                  <select id="paymentMethod" value={paymentData.method} onChange={handlePaymentMethodChange}>
                    <option value="">Select...</option>
                    <option value="paypal">PayPal</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                  </select>
                </div>
                {isPaymentFormVisible && (
                  <form onSubmit={handlePaymentSubmit} className="payment-details">
                    {paymentData.method === 'paypal' && (
                      <div className="paypal-payment">
                        <div className="form-group">
                          <label>Email:</label>
                          <input
                            type="email"
                            name="paypalEmail"
                            value={paymentData.paypalEmail}
                            onChange={handlePaymentInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Password:</label>
                          <input
                            type="password"
                            name="paypalPassword"
                            value={paymentData.paypalPassword}
                            onChange={handlePaymentInputChange}
                            required
                          />
                        </div>
                      </div>
                    )}
                    {(paymentData.method === 'credit_card' || paymentData.method === 'debit_card') && (
                      <div className="card-payment">
                        <div className="form-group">
                          <label>Card Number:</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={handlePaymentInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Expiration Date:</label>
                          <input
                            type="text"
                            name="cardExpirationDate"
                            value={paymentData.cardExpirationDate}
                            onChange={handlePaymentInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV:</label>
                          <input
                            type="text"
                            name="cardCVV"
                            value={paymentData.cardCVV}
                            onChange={handlePaymentInputChange}
                            required
                          />
                        </div>
                      </div>
                    )}
                    <button type="submit" disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : 'Pay'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="empty-message">
          <p>Your cart is empty</p>
        </div>
      )}
    </div>
  );
}

export default Cart;










 


























