import React from 'react';
import styles from './AdminProfile.module.css'; // Importing the CSS module

function AdminProfile() {
  return (
    <div className={styles.container}> {/* Using the container class from AdminProfile.module.css */}
      <h1>Admin Profile</h1>

      <div className={styles.section} id="customer-details"> {/* Using the section class */}
        <h2>Customer</h2>
        <div className={styles.dFlex}> {/* Using the dFlex class */}
          <input type="text" id="customer-name" name="customer-name" placeholder="Enter customer name" />
          <button type="button">Search</button>
        </div>
      </div>

      <div className={styles.section}>
        <h2><i className="bi bi-cart"></i> Cart</h2>
        <div className={styles.dFlex}>
          <input type="text" id="cart-search" name="cart-search" placeholder="Enter item to search" />
          <button type="button">Search</button>
        </div>
        <textarea id="cart" name="cart" placeholder="Enter items in your cart..."></textarea>
      </div>

      <div className={styles.section}>
        <h2><i className="bi bi-list-check"></i> Orders</h2>
        <div className={styles.dFlex}>
          <input type="text" id="order-search" name="order-search" placeholder="Enter order to search" />
          <button type="button">Search</button>
        </div>
        <textarea id="orders" name="orders" placeholder="Enter your orders..."></textarea>
      </div>
    </div>
  );
}

export default AdminProfile;
