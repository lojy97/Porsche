import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contact() {
  return (
    <div style={{ backgroundColor: 'black', height: '100%' }}>
      <div style={{ height: '100%' }} className="image-container">
        <img src="/photos gt3/rear 2.jpeg" className="img-fluid" alt="Your Image" style={{ width: '100%', height: '100%' }} />
        <div className="text-overlay">
          Email: <a href="mailto:adam.zidan@student.giu-uni.de">adam.zidan@student.giu-uni.de</a>
          <p>Phone number: <a href="tel:01069459905">01069459905</a></p>
          <a href="https://www.instagram.com/porsche?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
            <img src="/Images/Instagram Icon 1.jpg" alt="Instagram" style={{ height: '40px', width: '40px', float: 'left', marginRight: '10px' }} />
          </a>
          <a href="https://www.facebook.com/porsche">
            <img src="/Images/Facebook Icon.jpg" alt="Facebook" style={{ height: '40px', width: '40px', float: 'left', marginRight: '10px' }} />
          </a>
          <a href="https://twitter.com/Porsche">
            <img src="/Images/X Icon.png" alt="Twitter" style={{ height: '40px', width: '40px', float: 'left', marginRight: '10px' }} />
          </a>
        </div>
      </div>
    </div>
  );
}
const openSidebar = () => {
  document.getElementById("sidebar").style.left = "0";
}

const closeSidebar = () => {
  document.getElementById("sidebar").style.left = "-250px";
}

export default Contact;
