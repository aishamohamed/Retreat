
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get('http://localhost:5500'); // Adjust URL as needed
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }

    fetchTickets();
  }, []);

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit ticket with ID:', id);
  };

  return (
    <div>
      <h1>Edit Tickets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th>ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Currency</th>
                <th>Days Valid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket._id}</td>
                  <td>{ticket.type}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.price}</td>
                  <td>{ticket.currency}</td>
                  <td>{ticket.daysValid}</td>
                  <td>
                    <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleEdit(ticket._id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      )}
    </div>
  );
}

export default EditTickets;







