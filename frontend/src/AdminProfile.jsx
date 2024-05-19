import React, { useState } from 'react';
import styles from './AdminProfile.module.css'; // Importing the CSS module

function AdminProfile({ onSignOutSuccess }) {
  // const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState(''); 
  const [customerData, setCustomerData] = useState(null);

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Sign out successful');
        onSignOutSuccess();
      } else {
        throw new Error('Sign out failed');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const handleGETSearch = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/customer/GetAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('All customers data:', data);
        setCustomerData(data); // Update state with fetched data
      } else {
        throw new Error('Failed to fetch all customers data');
      }
    } catch (error) {
      console.error('Error fetching all customers data:', error);
    }
  };
  


  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/customer/AdminGet/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Customer data:', data);
        setCustomerData(data);
        // Handle customer data as needed
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  

  return (
    <div className={styles.container}> {/* Using the container class from AdminProfile.module.css */}
      <h1>Admin Profile</h1>
      
      <button type="button" className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button> {/* Sign Out Button */}

      <div className={styles.section} id="customer-details">
        <h2>Customer</h2>
        <div className={styles.dFlex}>
          <input 
            type="text" 
            id="customer-name" 
            name="customer-name" 
            placeholder="Enter customer name" 
            value={customerId} // Bind input value to state
            onChange={(e) => setCustomerId(e.target.value)} // Handle input change
          />
          <button type="button" onClick={handleSearch}>Search</button> {/* Attach click handler */}
          <button type="button" onClick={handleGETSearch}>GetAll</button>
        </div>
        {Array.isArray(customerData) && customerData.map((customer, index) => (
  <div key={index}>
    <p>Customer ID: {customer.CustomerID}</p>
    <p>Customer Name: {customer.Name}</p>
    <p>Customer Address: {customer.Address}</p>
    <p>Customer Email: {customer.Email}</p>
  </div>
))}
{!Array.isArray(customerData) && customerData && (
  <div>
    <p>Customer ID: {customerData.CustomerID}</p>
    <p>Customer Name: {customerData.Name}</p>
    <p>Customer Address: {customerData.Address}</p>
    <p>Customer Email: {customerData.Email}</p>
  </div>
)}

      </div>

      <div className={styles.section}>
        <h2><i className="bi bi-cart"></i> Cart</h2>
        <div className={styles.dFlex}>
          <input type="text" id="cart-search" name="cart-search" placeholder="Enter item to search" />
          <button type="button">Search</button>
          <button type="button">GetAll</button>
        </div>
        <textarea id="cart" name="cart" placeholder="Enter items in your cart..."></textarea>
      </div>

      <div className={styles.section}>
        <h2><i className="bi bi-list-check"></i> Orders</h2>
        <div className={styles.dFlex}>
          <input type="text" id="order-search" name="order-search" placeholder="Enter order to search" />
          <button type="button">Search</button>
          <button type="button">GetAll</button>
        </div>
        <textarea id="orders" name="orders" placeholder="Enter your orders..."></textarea>
      </div>
    </div>
  );
}

export default AdminProfile;
