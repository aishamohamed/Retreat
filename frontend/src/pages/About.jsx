/* eslint-disable no-unused-vars */
import React from 'react';
import '../style/About.css';

function About() {
  return (
    <div className='about-container'>
      <img className='about-pic' src='https://img.freepik.com/premium-photo/tropical-vacation-luxurious-hotel-romantic-beach-getaway-couples_763042-5806.jpg' alt="A picture of a retreat loacation" />
      <div className='about-content'>
        <h2 className='about-header'>About Us</h2>
        <p className='p1'>Welcome to Couple Retreat, where we believe in the power of love and the importance of nurturing relationships.</p>
        
        <p>At Couple Retreat, we understand that every relationship is unique, and we tailor our experiences to cater to the specific needs and desires of each couple. Whether you are newlyweds looking to deepen your connection or long-time partners seeking to rekindle the flame, we have something for everyone.</p>
        
        <p>Our team of experienced counselors and relationship experts are here to guide you on your journey towards a happier, healthier relationship. From couples therapy sessions to intimate getaways in breathtaking locations, we offer a range of services designed to help you and your partner thrive.</p>
        
        <p>Join us on this incredible adventure as we embark on a journey of love, growth, and discovery. Together, let us create unforgettable memories and build a foundation for a lifetime of happiness.</p>
        
        <p>We cannot wait to welcome you to Couple Retreat!</p>
      </div>
    </div>
  );
}

export default About;
