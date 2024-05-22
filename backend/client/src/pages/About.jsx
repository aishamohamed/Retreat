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
         
         <p>Aisha - responsible for backend  authentications, dashboard route,  frontend registration, payment functionality and part of css styling.</p>
         <p>Rauda - responsible for frontend design and styling of  pages such home, header, footer, shop, review pages with css and canva.</p>
         <p>Eszter - responsible for booking from backend, frontend pages such as the login, cart frontend authentication and functionalities, also part of css styling</p>
         <p>Yvonne  - responsible for the database , connecting Mongodb to the server, implementing routes and models.</p>
        <p>We cannot wait to welcome you !</p>
      </div>
    </div>
  );
}

export default About;
