/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/home.css';

function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get('https://retreat-backend-wh82.onrender.com/');
        console.log(response);
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
      <h2>Welcome to Celle Retreats</h2>
      <p>
        Welcome to Celle Retreats, where we believe in the power of love and the importance of nurturing relationships.
        At Celle Retreats, we understand that every relationship is unique,
        and we tailor our experiences to cater to the specific needs and desires of each couple.
      </p>
      <p>
        Whether you are newlyweds looking to deepen your connection or long-time partners seeking to rekindle the flame,
        we have something for everyone.
        Read about our upcoming retreats below.
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="ticket-container">
            {tickets.map((ticket, index) => (
              <div key={ticket._id} className="ticket-group">
                <h3>{ticket.type}</h3>
                <img src={`/${ticket.type.toLowerCase()}.jpg`} alt={`Ticket ${index}`} />
                <div className='type-des'>
                  <p>{ticket.description}</p>
                  <h4>Activities</h4>
                  <p>{ticket.activities}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;











