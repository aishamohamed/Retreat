/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://retreat-c6yw.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('There was a problem with the login request:', error);
      setErrors({ email: '', password: 'Invalid credentials' });
    }
  };

  return (
    <div className="login-container1">
      <div className="login-container">
        <h2>Login</h2>
        <p>Sign in to continue</p>
        <form onSubmit={handleSubmit}>
          <p>EMAIL</p>
          <div>
            <input
              type="email"
              name="email"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@something.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <p>PASSWORD</p>
          <div>
            <input
              type="password"
              name="password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="************"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;








