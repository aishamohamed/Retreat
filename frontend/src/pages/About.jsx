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
         
         <p>Aisha.</p>
         <p>Rauda.</p>
         <p>Eszter.</p>
         <p>Yvonne Onyango - responsible for database and backend part of the project.</p>
        <p>We cannot wait to welcome you !</p>
      </div>
    </div>
  );
}

export default About;
