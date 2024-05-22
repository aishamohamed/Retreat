/* eslint-disable no-unused-vars */
// PaymentOptions.jsx
import React, { useState } from 'react';
import PaymentDetails from './PaymentDetails';

function PaymentOptions() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div>
      <h3>Select Payment Method</h3>
      {/* Display payment method options */}
      <button onClick={() => handlePaymentMethodSelect('Credit Card')}>
        Credit Card
      </button>
      <button onClick={() => handlePaymentMethodSelect('PayPal')}>
        PayPal
      </button>
      {/* Show payment details component based on selected payment method */}
      {selectedPaymentMethod && <PaymentDetails method={selectedPaymentMethod} />}
    </div>
  );
}

export default PaymentOptions;
