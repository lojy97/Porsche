import React, { useState } from 'react';
import axios from 'axios';

const backend_url = "http://localhost:3000/api/v1";

function Register() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Address: '',
    Password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backend_url}/CustRegister`, formData);
      // Redirect or show success message
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-end">
        <div className="col-md-4">
          <div className="login-form">
            <h2 className="mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">Name:</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  className="form-control"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  className="form-control"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  className="form-control"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Address" className="form-label">Address:</label>
                <input
                  type="text"
                  id="Address"
                  name="Address"
                  className="form-control"
                  value={formData.Address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="login-info">
                <p>Already have an account? <a href="/HTML/login.html">Login here</a></p>
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
