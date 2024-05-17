import React, { useState } from 'react';
import styles from './login.module.css'; // Import the CSS module

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic
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
