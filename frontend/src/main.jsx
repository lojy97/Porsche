import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import AdminsProject from './AdminProducts.jsx';
import Login from './Login.jsx';
import Profile from './profile.jsx';
import Products from './Products.jsx';
import Register from './register.jsx';

import './App.css'; // Add a CSS file to style the navbar buttons

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false); // Close sidebar after navigation
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const handleLoginSuccess = () => {
    setCurrentPage('home');
    console.log() // Navigate to the homepage
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid justify-content-center">
          <button className="openbtn" onClick={openSidebar}>
            <span>&gt;</span> 
          </button>
          <a className="navbar-brand" href="https://www.porsche.com/middle-east/_egypt_/">
            <img src="/Images/porsche logo.png" alt="Porsche" className="navbar-brand-img" />
          </a>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => handleNavigation('home')}>Home</button>
              </li>
              <li className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => handleNavigation('about')}>About</button>
              </li>
              <li className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => handleNavigation('contact')}>Contact</button>
              </li>
              <li className={`nav-item ${currentPage === 'login' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => handleNavigation('login')}>Login</button>
              </li>
              <li className={`nav-item ${currentPage === 'product' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => handleNavigation('product')}>Browse</button>
              </li>
              <li className={`nav-item ${currentPage === 'adminproduct' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => handleNavigation('adminproduct')}>AdminProduct</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`overlay ${sidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
        <header>
          <button className="closebtn" aria-label="Close" onClick={closeSidebar}>
            <span aria-hidden="true">&times;</span>
          </button>
        </header>
        <ul className="menu">
          <li className="item">
            <button className="nav-link" onClick={() => handleNavigation('home')}>
              <i className="bi bi-house-door"></i> Home
            </button>
          </li>
          <li className="item">
            <button className="nav-link" onClick={() => handleNavigation('about')}>
              <i className="bi bi-info-circle"></i> About
            </button>
          </li>
          <li className="item">
            <button className="nav-link" onClick={() => handleNavigation('contact')}>
              <i className="bi bi-envelope"></i> Contact us
            </button>
          </li>
          <li className="item">
            <button className="nav-link" onClick={() => handleNavigation('profile')}>
              <i className="bi bi-envelope"></i> Profile
            </button>
          </li>
        </ul>
        <div className="sidebar-footer">
        <li className="item">
            <button className="nav-link" onClick={() => handleNavigation('login')}>
              <i className="bi bi-house-door"></i> Login
            </button>
          </li>
          <li className="item">
            <button className="nav-link" onClick={() => handleNavigation('register')}>
              <i className="bi bi-house-door"></i> Sign up
            </button>
          </li>
        </div>
      </div>

      {currentPage === 'home' && <Home />}
      {currentPage === 'about' && <About />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'profile' && <Profile />}
      {currentPage === 'product' && <Products />}
      {currentPage === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'register' && <Register />}
      {currentPage === 'adminproduct' && <AdminsProject />}
      
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
