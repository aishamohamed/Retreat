/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/payment.css';

const Payment = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('stripe'); 
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [proceedToPayment, setProceedToPayment] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrorMessage(''); // Clear any previous error messages
  };

  const handleProceedToPayment = () => {
    setProceedToPayment(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'stripe') {
      try {
        const { data: { clientSecret } } = await axios.post('https://retreat-c6yw.onrender.com/api/create-payment-intent', {
          amount: 500, // Example amount in kr
        });

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: 'Cardholder Name', // Replace with actual cardholder name
            },
          },
        });

        if (error) {
          setErrorMessage(error.message);
          setIsProcessing(false);
          return;
        }

        if (paymentIntent.status === 'succeeded') {
          localStorage.setItem('cartItems', JSON.stringify({}));
          setPaymentSucceeded(true);

          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error) {
        setErrorMessage('Failed to process card payment');
        setIsProcessing(false);
      }
    } else if (paymentMethod === 'paypal') {
      try {
        const response = await axios.post('https://retreat-c6yw.onrender.com/api/paypal', {
          userId: 'exampleUserId', // Replace with actual user ID
          email: paypalEmail,
          password: paypalPassword,
        });

        if (response.status === 200) {
          localStorage.setItem('cartItems', JSON.stringify({}));
          setPaymentSucceeded(true);

          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error) {
        setErrorMessage(error.response ? error.response.data.message : 'Failed to process PayPal payment');
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className='payment-container-wrapper'>
      <div className="payment-container">
        {paymentSucceeded ? (
          <div className="success-message">
            <h2>Payment Succeeded!</h2>
          </div>
        ) : (
          <div>
            {!proceedToPayment ? (
              <button className="proceed-button" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            ) : (
              <form className="payment-form" onSubmit={handleSubmit}>
                <div className="payment-method">
                  <label>
                    <input
                      type="radio"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={handlePaymentMethodChange}
                    />
                    Credit/Debit Card (Stripe)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={handlePaymentMethodChange}
                    />
                    PayPal
                  </label>
                </div>

                {paymentMethod === 'stripe' && (
                  <div className="stripe-payment">
                    <CardElement className="StripeElement" />
                    <div className="form-group">
                      <label>Card Number:</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiration Date:</label>
                      <input
                        type="text"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV:</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="paypal-payment">
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password:</label>
                      <input
                        type="password"
                        value={paypalPassword}
                        onChange={(e) => setPaypalPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <button type="submit" disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Pay'}
                </button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {isProcessing && <div className="processing-message">Processing your payment...</div>}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;


