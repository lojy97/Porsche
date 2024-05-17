import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // Make sure to create a CSS file for Profile styles if needed

const backend_url = "http://localhost:3000/api/v1";

function Profile() {
  //const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '', // Ideally, you shouldn't fetch the password
    cart: '',
    orders: '',
  });
  // const customerId = localStorage.getItem("userId");
  const customerId = 1;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backend_url}/users/${customerId}`, { withCredentials: true });
        const { name, email, cart, orders } = response.data;
        setProfile({ name, email, cart, orders });
      } catch (error) {
        console.log('Error fetching profile:', error);
        // Handle error appropriately, e.g., redirect to login if unauthorized
      }
    };

    fetchProfile();
  }, [customerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

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
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="Your Name"
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            placeholder="Your Email"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={profile.password}
            onChange={handleInputChange}
            placeholder="New Password"
          />

          <button type="button" className="btn btn-secondary">Change Password</button>
        </div>

        <div className="section">
          <h2><i className="bi bi-cart"></i> Cart</h2>
          <textarea
            id="cart"
            name="cart"
            value={profile.cart}
            onChange={handleInputChange}
            placeholder="Enter items in your cart..."
          ></textarea>
        </div>

        <div className="section">
          <h2><i className="bi bi-list-check"></i> Orders</h2>
          <textarea
            id="orders"
            name="orders"
            value={profile.orders}
            onChange={handleInputChange}
            placeholder="Enter your orders..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Profile;
