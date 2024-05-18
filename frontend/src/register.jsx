import React, { useState } from 'react';
import styles from './register.module.css'; // Import the CSS module

function Register({ handleRegisterSuccess }) {
  const [formData, setFormData] = useState({
    Name: '', // Change to 'Name' to match server-side expectation
    Email: '',
    Password: '',
    Address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerAndRedirect = async () => {
    try {
      // Log formData before sending the request
      console.log('formData:', formData);
  
      // Attempt to register as a customer
      console.log('Attempting to register as a customer');
      const response = await fetch('http://localhost:3000/api/v1/CustRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      // Get the response status
      const responseStatus = response.status;
  
      // Handle response status
      if (responseStatus === 400) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Handle error, e.g., display error message
      } else if (responseStatus === 201) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Invoke the handleRegisterSuccess function passed from the parent component
        handleRegisterSuccess();
      }
    } catch (error) {
      console.error('Error registering:', error);
      // Handle network or other errors
    }
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url('/photos gt3/final pic.png')` }}>
      <div className={`${styles.row} justify-content-end`}>
        <div className={`col-md-4 ${styles.col}`}>
          <div className={styles.loginForm}>
            <h2 className={`${styles.heading} mb-4`}>Register</h2>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="Name" className={`${styles.label} form-label`}>Full Name:</label>
              <input type="text" id="Name" name="Name" className={`${styles.input} form-control`} value={formData.Name} onChange={handleChange} required />
            </div>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="Email" className={`${styles.label} form-label`}>Email:</label>
              <input type="email" id="Email" name="Email" className={`${styles.input} form-control`} value={formData.Email} onChange={handleChange} required />
            </div>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="Password" className={`${styles.label} form-label`}>Password:</label>
              <input type="password" id="Password" name="Password" className={`${styles.input} form-control`} value={formData.Password} onChange={handleChange} required />
            </div>
            <div className={`${styles.mb} mb-3`}>
              <label htmlFor="Address" className={`${styles.label} form-label`}>Address:</label>
              <input type="text" id="Address" name="Address" className={`${styles.input} form-control`} value={formData.Address} onChange={handleChange} required />
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
