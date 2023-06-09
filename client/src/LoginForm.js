import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = ({ setAuthenticated, apiUrl }) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if a session token exists in localStorage
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      // Set the authenticated state if a session token is present
      setAuthenticated(true);
    }
  }, [setAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;

    try {
      const response = await axios.post(`${apiUrl}/login`, { username });
      const sessionToken = response.headers['authorization'];

      // Store the session token in localStorage
      localStorage.setItem('sessionToken', sessionToken);

      // Update the parent component's state to reflect the authenticated state
      setAuthenticated(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-header bg-dark text-light">
        <h2 className="card-title mt-2 text-center">Login</h2>
      </div>
      <div className="card-body">
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="mb-3">
          <input type="text" id="username" name="username" className="form-control" placeholder="Username" required />
        </div>
        <div className="text-center mt-2">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;