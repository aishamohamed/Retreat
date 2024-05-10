/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../style/Register.css'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(errors).length === 0) {
    try {
      // Valid form, perform API call to backend
      const response = await fetch('http://localhost:3500/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();        // Only parse if response is ok
      if (response.ok) {
        console.log('Registration successful:', data);
        // Clear form or redirect user
        setFormData({ username: '', email: '', password: '' });
      } else {
        // Handle backend validation errors (if any)
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    } else {
      // Set errors
      setErrors(errors);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-h2" >Register</h2>
        <div>
          <label htmlFor="username" className="register-label">USERNAME</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="register-input"
            placeholder='User1'
          />
          {errors.username && <span className="register-error">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="email" className="register-label">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            placeholder='Homehie@si.com'
          />
          {errors.email && <span className="register-error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password" className="register-label">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            placeholder='*****'
          />
          {errors.password && <span className="register-error">{errors.password}</span>}
        </div>
        <button type="submit" className='register-button'>REGISTER</button>
      </form>
    </div>
  );
}

export default Register;
