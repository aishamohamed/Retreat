import React from 'react';

function FAQ() {
  return (
    <div>
      <div>
        <h1>Frequently Asked Questions</h1>
        <div>
          <input type="text" placeholder="Search FAQs" />
          <button type="button">Search</button>
        </div>
      </div>
      <p>FAQ! Need help?</p>
      <p>We have got you covered.</p>
      <div>
        <img src="/orders.png" alt="Orders Icon" />
        <h3>How do I place an order?</h3>
        <p>To place an order, simply browse our available products, select the items you wish to purchase, and proceed to checkout.</p>
      </div>
      <div>
        <img src="/delivery.png" alt="Delivery Icon" />
        <h3>What are the delivery options?</h3>
        <p>We offer various delivery options including standard shipping, express shipping, and local pickup. Shipping costs and delivery times may vary depending on your location and selected shipping method.</p>
      </div>
      <div>
        <img src="/returns_refunds.png" alt="Returns & Refunds Icon" />
        <h3>What is your returns and refunds policy?</h3>
        <p>We have a flexible returns and refunds policy. If you are not satisfied with your purchase, you may return the item(s) within a specified period for a refund or exchange. Please refer to our returns and refunds policy for more information.</p>
      </div>
    </div>
  );
}

export default FAQ;



