/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../style/home.css";



function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get('http://localhost:3500'); // Adjust URL as needed
        console.log(response)

        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }

    fetchTickets();
  }, []);

  return (
    <div className='main'>
      <img src="cover.png" className='cover' alt='cover image'/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="ticket-container">
  {tickets.map((ticket, index) => (
    <div key={ticket._id} className={`ticket${index % 2 === 0 ?'-right':'-left'}`}>
      {index % 2 === 0 ? (
        <>
          <div className='type-des'>
            <h3>{ticket.type}</h3>
            <p>{ticket.description}</p>
          </div>
          <img src={`/${ticket.type.toLowerCase()}.jpg`} alt={`Ticket ${index + 1}`} />
        </>
      ) : (
        <>
          <img src={`/${ticket.type.toLowerCase()}.jpg`} alt={`Ticket ${index + 1}`} />
          <div className='type-des'>
            <h3>{ticket.type}</h3>

            <p>{ticket.description}</p>
          </div>
        </>
      )}
    </div>
  ))}
</div>

          
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




