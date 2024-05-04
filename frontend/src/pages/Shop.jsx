/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function Shop() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3500')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  return (
    <div>
      <h2>Welcome to Our Shop Department</h2>
      <p>We are pleased to have you around. Please let us know if you need any assistance. Otherwise, enjoy your visit!</p>
      
      <h2>All Tickets</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Days Valid</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.type}</td>
              <td>{ticket.description}</td>
              <td>{ticket.price}</td>
              <td>{ticket.currency}</td>
              <td>{ticket.daysValid}</td>
              <td>{ticket.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shop;
