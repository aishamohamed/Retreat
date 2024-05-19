/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'; 

function PaymentDetails({ onSubmit }) {
  const [paymentInfo, setPaymentInfo] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(paymentInfo);
  };

  return (
    <div>
      <h3>Enter Payment Details</h3>
      <label>
        Card Number:
        <input type="text" name="cardNumber" onChange={handleChange} />
      </label>
      <label>
        Expiry Date:
        <input type="text" name="expiryDate" onChange={handleChange} />
      </label>
      <label>
        CVV:
        <input type="text" name="cvv" onChange={handleChange} />
      </label>
      <button onClick={handleSubmit}>Submit Payment</button>
    </div>
  );
}


PaymentDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default PaymentDetails;

