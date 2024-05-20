import React, { useState } from 'react';
import styles from './register.module.css'; // Import the CSS module

function Register({ handleRegisterSuccess }) {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
    Address: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerAndRedirect = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/CustRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Registration successful:', responseData);
        handleRegisterSuccess();
      } else {
        setError(responseData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('Network error');
    }
  };

  const AdminRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/AdminRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // to make sure you're an admin
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Admin registration successful:', responseData);
        handleRegisterSuccess();
      } else {
        throw new Error(responseData.message || 'Admin registration failed');
      }
    } catch (error) {
      console.error('Error registering as admin:', error);
      setError(error.message || 'Network error');
    }
  };
  
  
  

  return (
    <div className={styles.container} style={{ backgroundImage: `url('/photos gt3/final pic.png')` }}>
      <div className={`${styles.row} justify-content-end`}>
        <div className={`col-md-4 ${styles.col}`}>
          <div className={styles.loginForm}>
            <h2 className={`${styles.heading} mb-4`}>Register</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
              <p>Already have an account? <span onClick={handleRegisterSuccess} style={{cursor: 'pointer'}}>Login here</span></p>
              <button type="button" className={`${styles.button} btn btn-primary`} onClick={registerAndRedirect}>Register</button>
              <button type="button" className={`${styles.button} btn btn-primary`} onClick={AdminRegister}>Admin register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
