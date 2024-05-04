/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

function CreateTicket() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    price: '',
    currency: '',
    daysValid: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3500', formData); // Adjust URL as needed
      // Redirect to ticket list or show success message
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Display error message to user
    }
  };

  return (
    <div>
      <h1>Create a New Ticket</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />

        <label htmlFor="currency">Currency:</label>
        <input type="text" id="currency" name="currency" value={formData.currency} onChange={handleChange} required />

        <label htmlFor="daysValid">Days Valid:</label>
        <input type="number" id="daysValid" name="daysValid" value={formData.daysValid} onChange={handleChange} required />

        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
}

export default CreateTicket;


