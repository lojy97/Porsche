import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css'; // Importing the CSS module

function Profile({ onSignOutSuccess }) {
    const [customer, setCustomer] = useState(null);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch customer, cart, and order data from the server
        fetchCustomer();
        fetchCart();
        fetchOrders();
    }, []);

    const fetchCustomer = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/customer/Get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch customer data (status: ${response.status})`);
            }

            const data = await response.json();
            console.log('Fetched customer data:', data);
            setCustomer(data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/cart/Get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch cart data (status: ${response.status})`);
            }

            const data = await response.json();
            console.log('Fetched cart data:', data);
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    const handleEdit = async (field, value) => {
        try {
            const requestBody = { [field]: value }; // Construct the request body
            const response = await fetch(`http://localhost:3000/api/v1/customer/Update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error(`Failed to edit ${field} (status: ${response.status})`);
            }
    
            const data = await response.json();
            console.log(`Edited ${field} successfully:`, data);
            fetchCustomer(); // Refresh customer data after edit
        } catch (error) {
            console.error(`Error editing ${field}:`, error);
        }
    };
      

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/orders/Get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch order data (status: ${response.status})`);
            }

            const data = await response.json();
            console.log('Fetched order data:', data);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
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

    console.log('Customer state:', customer);

    return (
        <div className={styles.pageBackground}>
            <div className="giant-container">
                <div className={styles.body}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Profile</h1>
                            <button
                                onClick={handleSignOut}
                                className={`${styles.btn} ${styles.btnSignOut}`}>
                                Sign Out
                            </button>
                        </div>
    
                        {customer && (
                            <div className={styles.section} id="personal-details">
                                <h2>Personal Details</h2>
                                <div className={styles.field}>
                                    <p><strong>Name:</strong> {customer.Name}</p>
                                    <input type="text" id="nameInput" />
                                </div>
                                <div className={styles.field}>
                                    <p><strong>Email:</strong> {customer.Email}</p>
                                    <input type="text" id="emailInput" />
                    
                                </div>
                                <div className={styles.field}>
                                    <p><strong>Address:</strong> {customer.Address}</p>
                                    <input type="text" id="addressInput" />
                                    
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="password">New Password:</label>
                                    <input type="password" id="password" name="password" placeholder="New Password" />
                                    <button onClick={() => handleEdit('Address')}>update profile</button>
                                </div>
                            </div>
                        )}
    
                        <div className={styles.section}>
                            <h2><i className="bi bi-cart"></i> Cart</h2>
                            {cart.length > 0 ? (
                                <ul>
                                    {cart.map((item, index) => (
                                        <li key={index}>
                                            <p><strong>Product:</strong> {item.productName}</p>
                                            <p><strong>Quantity:</strong> {item.quantity}</p>
                                            <p><strong>Price:</strong> ${item.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No items in the cart</p>
                            )}
                        </div>
    
                        <div className={styles.section}>
                            <h2><i className="bi bi-list-check"></i> Orders</h2>
                            {orders.length > 0 ? (
                                <ul>
                                    {orders.map((order, index) => (
                                        <li key={index}>
                                            <p><strong>Order ID:</strong> {order.orderId}</p>
                                            <p><strong>Date:</strong> {order.date}</p>
                                            <p><strong>Status:</strong> {order.status}</p>
                                            <ul>
                                                {order.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        <p><strong>Product:</strong> {item.productName}</p>
                                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                                        <p><strong>Price:</strong> ${item.price}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No orders available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
                                    
 export default Profile;