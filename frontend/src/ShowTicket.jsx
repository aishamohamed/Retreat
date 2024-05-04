/* eslint-disable no-unused-vars */

import React from 'react';
import { useParams } from 'react-router-dom';

function ShowTicket() {
  const { id } = useParams();

  return (
    <div>
      <h1>Show Ticket Details</h1>
      <p>Ticket ID: {id}</p>
      {/* Fetch and display ticket details based on the ID */}
    </div>
  );
}

export default ShowTicket;


