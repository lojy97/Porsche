import React from 'react';
import styles from './Contact.module.css'; // Import the CSS module

function Contact() {
  return (
    <div>
      <div className={`${styles['image-container']}`}>
        <img src="/photos gt3/rear 2.jpeg" className={`${styles['img-fluid']}`} alt="Your Image" />
        <div className={`${styles['text-overlay']}`}>
          <p>Email: <a href="mailto:adam.zidan@student.giu-uni.de">adam.zidan@student.giu-uni.de</a></p>
          <p>Phone number: <a href="tel:01069459905">01069459905</a></p>
          <a href="https://www.instagram.com/porsche?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
            <img src="/Images/Instagram Icon 1.jpg" alt="Instagram" className={`${styles['social-icon']}`} />
          </a>
          <a href="https://www.facebook.com/porsche">
            <img src="/Images/Facebook Icon.jpg" alt="Facebook" className={`${styles['social-icon']}`} />
          </a>
          <a href="https://twitter.com/Porsche">
            <img src="/Images/X Icon.png" alt="Twitter" className={`${styles['social-icon']}`} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
