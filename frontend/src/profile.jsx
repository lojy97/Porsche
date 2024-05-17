import React from 'react';
import styles from './Profile.module.css'; // Importing the CSS module

function Profile() {
    const openSidebar = () => {
        document.getElementById("sidebar").style.left = "0";
        document.getElementById("overlay").style.display = "block";
    }

    const closeSidebar = () => {
        document.getElementById("sidebar").style.left = "-250px";
        document.getElementById("overlay").style.display = "none";
    }

    // Function to prevent sidebar closing when clicking on links
    document.querySelectorAll(`.${styles.menu} a`).forEach((elem) => {
        elem.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

    return (
        <div>
            <div className={styles.pageBackground}> {/* Background div */}
            <div class="giant-container">
            <div className={styles.body}> {/* Applying body class */}
                <div className={styles.container}> {/* Applying container class */}
                    <h1>Profile</h1>

                    {/* Profile picture section */}
                    <div className={styles.profilePicture}> {/* Applying profilePicture class */}
                        <img src="/path_to_your_default_profile_picture.jpg" alt="Profile Picture" />
                    </div>
                    <button className={`${styles.btn} ${styles.btnPrimary} ${styles.dBlock} ${styles.mxAuto}`}>Add Profile Picture</button>

                    <div className={styles.section} id="personal-details"> {/* Applying section class */}
                        <h2>Personal Details</h2>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Your Email" />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="New Password" />

                        <button type="button">Change Password</button>
                    </div>

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
