/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Ticket from '../components/ticket';
import "../style/cart.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './Payment';

const stripePromise = loadStripe('pk_test_51PI9qoAW69DtYWYc4sSVUQ2mHHBGfT1It8K4bMr1WgFQifJlWwZAPA2CdWtZCR5l9wPTtgO8qgcjJHIFkmUPpy2H00vnyFOXRB');

function Cart() {
  const [cartItems, setCartItems] = useState([]);
<<<<<<< Updated upstream
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpirationDate, setCardExpirationDate] = useState('');
  const [cardCVV, setCardCVV] = useState('');
=======
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);

>>>>>>> Stashed changes

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
              setLoading(false);
            })
            .catch(error => console.error('Error fetching tickets:', error));
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

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
<<<<<<< Updated upstream
  };

  const purchaseCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if(token) {
        if (paymentMethod === 'paypal') {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: paypalEmail,
              password: paypalPassword
            }),
          };
          
          const response = await fetch(`http://localhost:3500/payment/paypal`, requestOptions);
          const data = await response.json();

          if (response.ok) {
            localStorage.setItem('cartItems', JSON.stringify({}));
            setCartItems([]);
            alert(data.message); //  success message
          } else {
            alert(data.message); //  error message
          }
        } else if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cardNumber,
              expirationDate: cardExpirationDate,
              cvv: cardCVV
            }),
          };
          
          const response = await fetch(`http://localhost:3500/payment/card`, requestOptions);
          const data = await response.json();

          if (response.ok) {
            localStorage.setItem('cartItems', JSON.stringify({}));
            setCartItems([]);
            alert(data.message); //  success message
          } else {
            alert(data.message); // error message
          }
        } else {
          alert('Please select a payment method');
        }
      } else {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error purchasing cart:', error);
      alert('Failed to process payment. Please try again later.');
    }
  };
=======
};
  
const showPaymentForm = () => {
  setIsPaymentFormVisible(true);
};

const handlePaymentSuccess = () => {
  localStorage.setItem('cartItems', JSON.stringify({}));
  setCartItems([]);
  alert('Purchase successful');
  setIsPaymentFormVisible(false);
};
>>>>>>> Stashed changes

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
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
            <p>Total: {calculateTotal()}</p>
            <button onClick={purchaseCart}>Purchase</button>
          </div>
          <div>
            <label>
              Select Payment Method:
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="">Select...</option>
                <option value="paypal">PayPal</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
              </select>
            </label>
          </div>
          {paymentMethod === 'paypal' && (
            <div>
              <input type="email" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} placeholder="Enter your PayPal email" />
              <input type="password" value={paypalPassword} onChange={(e) => setPaypalPassword(e.target.value)} placeholder="Enter your PayPal password" />
            </div>
          )}
          {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
            <div>
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" />
              <input type="text" value={cardExpirationDate} onChange={(e) => setCardExpirationDate(e.target.value)} placeholder="Expiration Date (MM/YY)" />
              <input type="text" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} placeholder="CVV" />
            </div>
          )}
        </div>
      )}
<<<<<<< Updated upstream
=======
      {cartItems.length > 0 && (
        <>
          <h3>Total: {calculateTotal()} SEK</h3>
          <button onClick={showPaymentForm}>
            Proceed to Payment
          </button>
        </>
      )}
      {isPaymentFormVisible && (
        <Elements stripe={stripePromise}>
          <PaymentForm totalAmount={calculateTotal()} onSuccess={handlePaymentSuccess} />
        </Elements>
      )}
>>>>>>> Stashed changes
    </div>
  );
}

export default Cart;
























