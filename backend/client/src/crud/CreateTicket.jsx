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
    location: '',
    activities: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success message

    try {
      await axios.post('https://retreat-c6yw.onrender.com/ticket', formData);
      setSuccess('Ticket created successfully!');
      setFormData({
        type: '',
        description: '',
        price: '',
        currency: '',
        daysValid: '',
        location: '',
        activities: ''
      });
    } catch (error) {
      setError('Error creating ticket: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>Create a New Ticket</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
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

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />

        <label htmlFor="activities">Activities:</label>
        <input type="text" id="activities" name="activities" value={formData.activities} onChange={handleChange} required />

        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
}

export default CreateTicket;




