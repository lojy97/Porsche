import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css'; // Importing the CSS module

function Profile() {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        // Fetch customer data from the server
        fetchCustomer();
    }, []);

    const fetchCustomer = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/customer/Get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Include credentials if needed
                credentials: 'include'
            });

            // Check response status code
            if (!response.ok) {
                throw new Error(`Failed to fetch customer data (status: ${response.status})`);
            }

            const data = await response.json();
            console.log('Fetched customer data:', data); // Log the data received from the server
            setCustomer(data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    // Log the customer state
    console.log('Customer state:', customer);

    return (
        <div>
            <div className={styles.pageBackground}> {/* Background div */}
                <div className="giant-container">
                    <div className={styles.body}> {/* Applying body class */}
                        <div className={styles.container}> {/* Applying container class */}
                            <h1>Profile</h1>

                            {/* Profile picture section */}
                            <div className={styles.profilePicture}> {/* Applying profilePicture class */}
                                <img src="/path_to_your_default_profile_picture.jpg" alt="Profile Picture" />
                            </div>
                            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.dBlock} ${styles.mxAuto}`}>Add Profile Picture</button>

                            {/* Personal details section */}
                            {customer && (
                            <div className={styles.section} id="personal-details">
                            <h2>Personal Details</h2>
                            <p><strong>Name:</strong> {customer.Name}</p>
                             <p><strong>Email:</strong> {customer.Email}</p>
                            <p><strong>Address:</strong> {customer.Address}</p>
        {/* Add input fields for password and change password button */}
                            <label htmlFor="password">New Password:</label>
                            <input type="password" id="password" name="password" placeholder="New Password" />
                            <button type="button">Change Password</button>
    </div>
)}


                            <div className={styles.section}>
                                <h2><i className="bi bi-cart"></i> Cart</h2>
                                <textarea id="cart" name="cart" placeholder="Enter items in your cart..."></textarea>
                            </div>

                            <div className={styles.section}>
                                <h2><i className="bi bi-list-check"></i> Orders</h2>
                                <textarea id="orders" name="orders" placeholder="Enter your orders..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
