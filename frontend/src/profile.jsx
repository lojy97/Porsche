import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css'; // Importing the CSS module

function Profile({ onSignOutSuccess, handleAdminSwap }) {
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
            console.log('Fetching cart data...');
            const response = await fetch('http://localhost:3000/api/v1/cart/getCart', {
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

    const handleEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedCustomerData = {
            Name: formData.get('Name'),
            Email: formData.get('Email'),
            Address: formData.get('Address'),
            Password: formData.get('password') // Assuming you want to update the password too
        };

        try {
            // Make a PUT request to update the customer data
            const response = await fetch('http://localhost:3000/api/v1/customer/Update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCustomerData),
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Customer updated successfully');
                // Handle the successful update, such as displaying a success message
            } else {
                console.error('Failed to update customer');
                // Handle the failure, such as displaying an error message
            }
        } catch (error) {
            console.error('Error updating customer:', error);
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

    const handleAdminSwaping = async () => {
        try {
            // Here you might add any necessary pre-processing or logging if needed
            console.log('Admin swap initiated');

            // Call the handleAdminSwap function passed as a prop
            handleAdminSwap();
        } catch (error) {
            console.error('Error during admin swap:', error);
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
                            <button
                                onClick={handleAdminSwaping}
                                className={`${styles.btn} ${styles.btnAdminPage}`}>
                                Admin Page
                            </button>
                        </div>

                        {customer && (
                            <form onSubmit={handleEdit}>
                                <div className={styles.section} id="personal-details">
                                    <h2>Personal Details</h2>
                                    <div className={styles.field}>
                                        <label htmlFor="Name">Name: {customer.Name}</label>
                                        <input type="text" id="Name" name="Name" defaultValue="" />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="Email">Email: {customer.Email}</label>
                                        <input type="text" id="Email" name="Email" defaultValue="" />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="Address">Address: {customer.Address}</label>
                                        <input type="text" id="Address" name="Address" defaultValue="" />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="password">New Password:</label>
                                        <input type="password" id="password" name="password" placeholder="New Password" />
                                    </div>
                                    <button type="submit">Update Profile</button>
                                </div>
                            </form>
                        )}

                        <div className={styles.section}>
                            <h2><i className="bi bi-cart"></i> Cart</h2>
                            {cart.length > 0 ? (
                                <ul>
                                    {cart.map((item, index) => (
                                        <li key={index}>
                                            <p><strong>Cart ID:</strong> {item.CartID}</p>
                                            <p><strong>Total Price:</strong> ${item['Total price']}</p>
                                            <p><strong>Products:</strong></p>
                                            <ul>
                                                {Array.isArray(item.ProductNames) && item.ProductNames.length > 0 ? (
                                                    item.ProductNames.map((productName, idx) => (
                                                        <li key={idx}>
                                                            <p><strong>Product Name:</strong> {productName}</p>

                                                        </li>
                                                    ))
                                                ) : (
                                                    <p>No products available</p>
                                                )}
                                            </ul>
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
                                                {Array.isArray(order.items) ? order.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        <p><strong>Product:</strong> {item.productName}</p>
                                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                                        <p><strong>Price:</strong> ${item.price}</p>
                                                    </li>
                                                )) : (
                                                    <p>No items available</p>
                                                )}
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
