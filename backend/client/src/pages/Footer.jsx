
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../style/footer.css';

function Footer() {
  return (
    <footer>
      <div>
        <h3>Contact Us</h3>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} />
        </a>
        <a href="mailto:Cellesupport@gmail.com">
          <FaEnvelope size={24} />
        </a>
      </div>
      <div>
        <h4>Payment Methods</h4>
        <ul>
          <li>Credit/Debit Cards</li>
          <li>Apple Pay</li>
        </ul>
      </div>
      <div>
        <h4>All tickets are Refundable!</h4>
        <h5>&copy; 2024</h5>
      </div>
    </footer>
  );
}

export default Footer;



