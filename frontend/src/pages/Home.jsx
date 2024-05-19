/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/home.css";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get('http://localhost:3500');
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
<<<<<<< Updated upstream
    <div className='main'>
          <h2>Welcome to Celle Retreats</h2>

    <p>Welcome to Celle Retreats, where we believe in the power of love and the importance of nurturing relationships.
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

      {/* Links to CRUD Pages */}
      <div>
        <Link to="/tickets/create">Create Ticket</Link>
        <br />
        <Link to="/tickets/edit/:id">Edit Ticket</Link>
        <br />
        <Link to="/tickets/delete/:id">Delete Ticket</Link>
        <br />
=======
    <>
      <div className='cover-container'>
        <img src="cover.png" className='cover' alt='cover image' />
>>>>>>> Stashed changes
      </div>
      <div className='main'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="ticket-container">
            {tickets.map((ticket, index) => (
              <div key={ticket._id} className="ticket">
                <img src={`/${ticket.type.toLowerCase()}.jpg`} alt={`Ticket ${index + 1}`} />
                <div className='type-des'>
                  <h3>{ticket.type}</h3>
                  <p>{ticket.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;










