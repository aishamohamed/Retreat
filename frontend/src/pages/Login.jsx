/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../style/login.css';

function Login() {
  const [formData, setFormData] = useState({
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
      loginRequest(formData.email, formData.password);
      // Clear form
      setFormData({ email: '', password: '' });
    } else {
      // Set errors
      setErrors(errors);
    }
  };

  const loginRequest = (email, password) => {
    fetch('http://localhost:3500/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then(response => {
      if (!response.ok) {
        message = response.json()
        if(message.error == "email") {
          setErrors({email: 'Unknown user', password: ''});
        } else if(message.error == "password") {
          setErrors({email: '', password: 'Incorrect password'});
        }
      }
      return response.json()
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the login request:', error);
    })
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
              id="email"
              name="email"
              className='login-input'
              value={formData.email}
              onChange={handleChange}
              placeholder='email@somthings.com'
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <p>PASSWORD</p>
          <div>
            <input
              className='login-input'
              type="password"
              id="password"
              name="password"
              placeholder='************'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className='login-button'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
