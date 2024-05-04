/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Header from './pages/Header';
import Footer from './pages/Footer';
import About from './pages/About';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import CreateTicket from './CreateTicket';
import DeleteTicket from './DeleteTicket';
import EditTicket from './EditTicket';
import Home from './pages/Home';
import ShowTicket from './ShowTicket';

function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Include the Header component */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} /> {/* Moved inside Routes */}
          <Route path="/register" element={<Register />} /> {/* Moved inside Routes */}
          <Route path="/login" element={<Login />} /> {/* Moved inside Routes */}
          <Route path="/tickets/create" element={<CreateTicket />} />
          <Route path="/tickets/edit/:id" element={<EditTicket />} />
          <Route path="/tickets/delete/:id" element={<DeleteTicket />} />
          <Route path="/tickets/:id" element={<ShowTicket />} />
        </Routes>
        
        <Footer /> {/* Include the Footer component */}
      </div>
    </Router>
  );
}

export default App;





