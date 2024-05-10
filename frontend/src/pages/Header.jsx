/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.ico';

function Header() {
  return (
    <header>
      <div className="navbar">
        <img src={logo} alt="Celle Retreats Logo" className="navbar-logo"/>
        <h1 className="logo">CELLE RETREATS</h1>
        <nav>
          <ul>
            <li><Link to="/" className="nav-link">HOME</Link></li>
            <li><Link to="/about" className="nav-link">ABOUT</Link></li>
            <li><Link to="/retreat" className="nav-link">RETREATES</Link></li>
            <li><Link to="/shop" className="nav-link">SHOP</Link></li>
            <li><Link to="/contact" className="nav-link">CONTACT</Link></li>
            <li><Link to="/register" className="nav-link">SIGN UP</Link></li>
            <li><Link to="/login" className="nav-link">LOGIN</Link></li>
            <li><Link to="/cart" className="nav-link"><img src='/shopping_cart.svg' alt="Cart Icon"/></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

