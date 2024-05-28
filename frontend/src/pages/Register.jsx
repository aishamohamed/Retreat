/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../style/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Regular expressions for validation
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^.{6,}$/;

    // Simple validation
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('https://retreat-backend-wh82.onrender.com/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          if (response.status === 400) {
            const data = await response.json();
            setRegistrationMessage(data.message);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          console.log('Registration successful:', data);
          setFormData({ username: '', email: '', password: '' });
          setRegistrationMessage('Registration successful! Please log in.');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        setRegistrationMessage('Registration failed. Please try again.');
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-h2">Register</h2>
        <div>
          <label htmlFor="username" className="register-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="register-input"
            placeholder="User1"
          />
          {errors.username && <span className="register-error">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="email" className="register-label">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            placeholder="Homehie@si.com"
          />
          {errors.email && <span className="register-error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password" className="register-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            placeholder="*****"
          />
          {errors.password && <span className="register-error">{errors.password}</span>}
        </div>
        <button type="submit" className="register-button">
          REGISTER
        </button>
        {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
      </form>
    </div>
  );
};

export default Register;




