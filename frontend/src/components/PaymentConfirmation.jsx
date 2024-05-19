/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

function PaymentConfirmation({ total, paymentMethod, onConfirmPayment }) {
  return (
    <div>
      <h3>Confirm Payment</h3>
      <p>Total Amount: {total}</p>
      <p>Payment Method: {paymentMethod}</p>
      <button onClick={onConfirmPayment}>Confirm Payment</button>
    </div>
  );
}

// Define prop types
PaymentConfirmation.propTypes = {
  total: PropTypes.number.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  onConfirmPayment: PropTypes.func.isRequired
};

export default PaymentConfirmation;

