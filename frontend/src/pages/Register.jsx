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

  const handleSubmit = (e) => {
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
      // Valid form, can perform further actions like sending data to backend
      console.log('Form submitted:', formData);
      // Clear form
      setFormData({ username: '', email: '', password: '' });
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
          <label htmlFor="username" className="register-label">Username</label>
          <input
            type="text"
            id="username"
            name="USERNAME"
            value={formData.username}
            onChange={handleChange}
            className="register-input"
            placeholder='User1'
          />
          {errors.username && <span className="register-error">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="email" className="register-label">Email</label>
          <input
            type="email"
            id="email"
            name="EMAIL"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            placeholder='Homehie@si.com'
          />
          {errors.email && <span className="register-error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password" className="register-label">Password</label>
          <input
            type="password"
            id="password"
            name="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            placeholder='*****'
          />
          {errors.password && <span className="register-error">{errors.password}</span>}
        </div>
        <button type="submit" className='register-button'>Register</button>
      </form>
    </div>
  );
}

export default Register;
