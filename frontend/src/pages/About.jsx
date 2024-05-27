/* eslint-disable no-unused-vars */
import React from 'react';
import '../style/About.css';

function About() {
  return (
    <div className='about-container'>
      <img className='about-pic' src='https://img.freepik.com/premium-photo/tropical-vacation-luxurious-hotel-romantic-beach-getaway-couples_763042-5806.jpg' alt="A picture of a retreat loacation" />
      <div className='about-content'>
        <h2 className='about-header'>About Us</h2>
        <p className='p1'>Welcome to Celle Retreat, where we believe in the power of love and the importance of nurturing relationships. Meet the members behind Celle Retreat!</p>
         
         <p>Aisha - responsible for dashboard implementations, authRoutes, stripePayment functionalities and registration.</p>
         <p>Rauda - responsible frontend design, styling of pages with canva and css and review, home pages implementations.</p>
         <p>Eszter - responsible for cart and booking functionalities and css stylings</p>
         <p>Yvonne  - responsible for database and most backend part of the project such as the server, models and some routes.</p>
        <p>We cannot wait to welcome you !</p>
      </div>
    </div>
  );
}

export default About;
