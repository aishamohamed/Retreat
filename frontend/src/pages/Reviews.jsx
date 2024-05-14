/* eslint-disable no-unused-vars */
import React from 'react';

function Reviews() {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          {/* Advertisements */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ marginBottom: '10px' }}>Yelp</div>
            <div style={{ marginBottom: '10px' }}>Google</div>
            <div style={{ marginBottom: '10px' }}>Facebook</div>
            <div style={{ marginBottom: '10px' }}>Instagram</div>
            <div style={{ marginBottom: '10px' }}>Apple Pay</div>
          </div>
        </div>
      </div>

      <h1>Reviews & TESTIMONIALS</h1>
      <h2><em>Check out our latest reviews.</em></h2>
      <div className="review">
        <img src="/profile-pic1.jpg" alt="Profile Pic" />
        <div>
          <h3>TOM S</h3>
          <div className="rating">⭐⭐⭐⭐</div>
          <h4>Great GETAWAY experience!</h4>
          <p>Celle Retreats exceeded my expectations, Super helpful staff. Highly recommended.</p>
          <p>Source: Google</p>
        </div>
      </div>
      <div className="review">
        <img src="/profile-pic2.jpg" alt="Profile Pic" />
        <div>
          <h3>Maria Amore</h3>
          <div className="rating">⭐⭐⭐</div>
          <h4>Good but could be better</h4>
          <p>Overall a good getaway retreat package, We bought Culinary ticket to Paris which was romantic. But there are some areas for improvement.</p>
          <p>Source: Google</p>
        </div>
      </div>
      <div className="review">
        <img src="/profile-pic3.jpg" alt="Profile Pic" />
        <div>
          <h3>Sadi Calvano</h3>
          <div className="rating">⭐⭐</div>
          <h4>Average!</h4>
          <p>My partner and I bought Adventure Retreat, overall was an okay package but the prices can be reduced.</p>
          <p>Source: Google</p>
        </div>
      </div>
      {/* Additional Reviews */}
      <div className="review">
        <img src="/profile-pic4.jpg" alt="Profile Pic" />
        <div>
          <h3>Emily Johnson</h3>
          <div className="rating">⭐⭐⭐⭐⭐</div>
          <h4>Unforgettable Experience!</h4>
          <p>Our family had an amazing time at Celle Retreats. The facilities were top-notch, and the staff was incredibly friendly and accommodating. We will definitely be coming back!</p>
          <p>Source: Google</p>
        </div>
      </div>
      <div className="review">
        <img src="/profile-pic5.jpg" alt="Profile Pic" />
        <div>
          <h3>John Doe</h3>
          <div className="rating">⭐⭐⭐⭐⭐</div>
          <h4>Exceptional Service!</h4>
          <p>I have been to many retreats, but Celle Retreats stands out for its exceptional service and attention to detail. Every aspect of my stay was perfect, from the accommodations to the activities offered. Highly recommended!</p>
          <p>Source: Google</p>
        </div>
      </div>
    </div>
  );
}

export default Reviews;

