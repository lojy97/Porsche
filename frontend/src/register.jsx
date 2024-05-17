import React from 'react';
import styles from './register.module.css'; // Import the CSS module

function Register() {
  const registerAndRedirect = async () => {
    // Your registration logic here
  };

  return (
    <div className={styles.container} style={{backgroundImage: `url('/photos gt3/final pic.png')`}}>
      <div className={`${styles.row} justify-content-end`}>
        <div className={`col-md-4 ${styles.col}`}>
          <div className={styles.loginForm}>
            <h2 className={`${styles.heading} mb-4`}>Register</h2>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="firstName" className={`${styles.label} form-label`}>First Name:</label>
              <input type="text" id="firstName" name="firstName" className={`${styles.input} form-control`} required />
            </div>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="lastName" className={`${styles.label} form-label`}>Last Name:</label>
              <input type="text" id="lastName" name="lastName" className={`${styles.input} form-control`} required />
            </div>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="email" className={`${styles.label} form-label`}>Email:</label>
              <input type="email" id="email" name="email" className={`${styles.input} form-control`} required />
            </div>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="password" className={`${styles.label} form-label`}>Password:</label>
              <input type="password" id="password" name="password" className={`${styles.input} form-control`} required />
            </div>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="address" className={`${styles.label} form-label`}>Address:</label>
              <input type="text" id="address" name="address" className={`${styles.input} form-control`} required />
            </div>
            <div className={`${styles.loginInfo} login-info`}>
              <p>Already have an account? <a href="/HTML/login.html">Login here</a></p>
              <button type="button" className={`${styles.button} btn btn-primary`} onClick={registerAndRedirect}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
