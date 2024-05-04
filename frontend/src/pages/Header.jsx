/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Celle Retreats</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/retreat">Retreat</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

