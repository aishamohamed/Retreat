/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAutoKeys } from "react-easier";

// Import components
import Header from './pages/Header';
import Footer from './pages/Footer';
import About from './pages/About';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Retreat from './pages/Retreat';
import Dashboard from './pages/Dashboard';
import CreateTicket from './crud/CreateTicket';
import DeleteTicket from './crud/DeleteTicket';
import EditTicket from './crud/EditTicket';
import Home from './pages/Home';
import ShowTicket from './crud/ShowTicket';





function App() {
  useAutoKeys();
  return (
    <Router>
      <div className="body">
        <Header />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/retreat" element={<Retreat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets/create" element={<CreateTicket />} />
            <Route path="/tickets/edit/:id" element={<EditTicket />} />
            <Route path="/tickets/delete/:id" element={<DeleteTicket />} />
            <Route path="/tickets/:id" element={<ShowTicket />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;







