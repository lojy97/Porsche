import React, { useState } from 'react';
import styles from './login.module.css'; // Import the CSS module

function Login({ onLoginSuccess }) {
  const handleLogin = async (event) => {
    event.preventDefault();
  
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    try {
      // First, attempt to log in as admin
      console.log('Attempting to log in as admin');
      let response = await fetch('http://localhost:3000/api/v1/AdminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Name: username, Password: password }),
        credentials: 'include' // Include credentials (cookies) in the request
      });
  
      // If admin login fails, try customer login
      if (!response.ok) {
        console.log('Admin login failed, trying customer login');
        response = await fetch('http://localhost:3000/api/v1/CustLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Name: username, Password: password }),
          credentials: 'include' // Include credentials (cookies) in the request
        });
      }
  
      const data = await response.json();
  
      // Handle response from the server, such as setting tokens or displaying errors
      if (response.ok) {
        // Invoke the onLoginSuccess function passed from the parent component
        onLoginSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`row justify-content-end ${styles.row}`}>
        <div className={`col-md-4 ${styles.col}`}>
          <div className={styles.loginForm}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className={`mb-3 ${styles.mb}`}>
                <label htmlFor="username" className={`form-label ${styles.label}`}>Username</label>
                <input type="text" className={`form-control ${styles.input}`} id="username" required />
              </div>
              <div className={`mb-3 ${styles.mb}`}>
                <label htmlFor="password" className={`form-label ${styles.label}`}>Password</label>
                <input type="password" className={`form-control ${styles.input}`} id="password" required />
              </div>
              <button type="submit" className={`btn btn-primary ${styles.button}`}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
