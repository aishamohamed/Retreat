/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';

import '../style/retreat.css'; 

function Retreat() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get('http://localhost:3500/'); 
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }

    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/${id}`); // Adjust URL as needed
      setTickets(tickets.filter(ticket => ticket._id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div>
      <div className='cart-head'><h1 style={{ fontStyle: 'italic', fontSize: '24px' }}>Our Ticketcard</h1></div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Days Valid</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="ticket-card">
                <td>{ticket.type}</td>
                <td>{ticket.price}</td>
                <td>{ticket.currency}</td>
                <td>{ticket.daysValid}</td>
                <td>
                  <Link to={`/tickets/edit/${ticket._id}`}><FaPen /></Link>
                  <button onClick={() => handleDelete(ticket._id)}><FaTrash style={{ color: 'red' }} /></button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5">
                <Link to="/tickets/create"><button style={{ marginTop: '10px' }}><FaPlus /> Create Ticket</button></Link>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Retreat;
