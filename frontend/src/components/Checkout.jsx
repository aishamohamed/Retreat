/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import PaymentOptions from './PaymentOptions';
import PaymentDetails from './PaymentDetails';
import PaymentConfirmation from './PaymentConfirmation';

function Checkout({ cartItems, total, onCompletePurchase }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    // Automatically move to the next step if cart is empty
    if (cartItems.length === 0) {
      handlePaymentMethodSelect();
    }
  }, [cartItems]);

  const handlePaymentMethodSelect = (method = '') => {
    setPaymentMethod(method);
    setStep(3);
  };

  const handlePaymentDetailsSubmit = (details) => {
    setPaymentDetails(details);
    setStep(4);
  };

  const handleCompletePayment = () => {
    onCompletePurchase(paymentMethod, paymentDetails);
    setStep(5);
  };

  return (
    <div>
      <h2>Checkout</h2>
      {step === 1 && cartItems.length > 0 && (
        <div>
          {/* Display cart items here */}
          <h3>Cart Items:</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        </div>
      )}
      {step === 2 && (
        <PaymentOptions onSelectPaymentMethod={handlePaymentMethodSelect} />
      )}
      {step === 3 && (
        <PaymentDetails onSubmit={handlePaymentDetailsSubmit} />
      )}
      {step === 4 && (
        <PaymentConfirmation
          total={total}
          paymentMethod={paymentMethod}
          onConfirmPayment={handleCompletePayment}
        />
      )}
      {step === 5 && <p>Payment Successful!</p>}
    </div>
  );
}

// Define prop types
Checkout.propTypes = {
  cartItems: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  onCompletePurchase: PropTypes.func.isRequired
};

export default Checkout;

