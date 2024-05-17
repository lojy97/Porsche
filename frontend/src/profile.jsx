import React from 'react';
import './Profile.css'; // Make sure to create a CSS file for Profile styles if needed

function Profile() {
  return (
    <div>
      <div className="container">
        <h1>Profile</h1>

        {/* Profile picture section */}
        <div className="profile-picture">
          <img src="/path_to_your_default_profile_picture.jpg" alt="Profile Picture" />
        </div>
        <button className="btn btn-primary d-block mx-auto">Add Profile Picture</button>

        <div className="section" id="personal-details">
          <h2>Personal Details</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Your Name" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Your Email" />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="New Password" />

          <button type="button" className="btn btn-secondary">Change Password</button>
        </div>

        <div className="section">
          <h2><i className="bi bi-cart"></i> Cart</h2>
          <textarea id="cart" name="cart" placeholder="Enter items in your cart..."></textarea>
        </div>

        <div className="section">
          <h2><i className="bi bi-list-check"></i> Orders</h2>
          <textarea id="orders" name="orders" placeholder="Enter your orders..."></textarea>
        </div>
      </div>
    </div>
  );
}

export default Profile;
