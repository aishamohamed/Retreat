import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/payment.css';  // Import the CSS file

const PaymentForm = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }

    const { data: { clientSecret } } = await axios.post('http://localhost:3500/api/create-payment', {
      amount: 500, // Example amount in kr  
    });

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setErrorMessage(confirmError.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      localStorage.setItem('cartItems', JSON.stringify({}));
      setPaymentSucceeded(true);

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }

    setIsProcessing(false);
  };

  return (
    <div className='payment-container-wrapper'> 
        <div className="payment-container">
            {paymentSucceeded ? (
            <div className="success-message">
                <h2>Payment Succeeded!</h2>
            </div>
            ) : (
            <form className="payment-form" onSubmit={handleSubmit}>
                <CardElement className="StripeElement" />
                <button type="submit" disabled={!stripe || isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay'}
                </button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {isProcessing && <div className="processing-message">Processing your payment...</div>}
            </form>
            )}
        </div>
   </div>
  );
};

export default PaymentForm;
