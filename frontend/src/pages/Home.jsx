/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get('http://localhost:3500'); // Adjust URL as needed
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }

    fetchTickets();
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>All Tickets</h2>
          <table className="ticket-table"> {/* Apply CSS class */}
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
      )}

      {/* Links to CRUD Pages */}
      <div>
        <Link to="/tickets/create">Create Ticket</Link>
        <br />
        <Link to="/tickets/edit/:id">Edit Ticket</Link>
        <br />
        <Link to="/tickets/delete/:id">Delete Ticket</Link>
        <br />
      </div>
    </div>
  );
}

export default Home;




