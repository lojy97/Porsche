import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import './Home.css';
import './About.css';
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
              <li className="nav-item">
                <a className="nav-link" href="/HTML/login.html">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/contact.html">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/products.html">Browse</a>
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
          <li className="item"><a href="/HTML/Home.html"><i className="bi bi-house-door"></i> Home</a></li>
          <li className="item"><a href="/HTML/about.html"><i className="bi bi-info-circle"></i> About</a></li>
          <li className="item"><a href="/HTML/contact.html"><i className="bi bi-envelope"></i> Contact us</a></li>
          <li className="item"><a href="/profile"><i className="bi bi-person"></i> Profile</a></li>
        </ul>
        <div className="sidebar-footer">
          <a href="login.html"><i className="bi bi-door-open"></i> Login</a>
          <a href="/HTML/register.html"><i className="bi bi-person-plus"></i> Sign Up</a>
        </div>
      </div>

      {currentPage === 'home' && <Home />}
      {currentPage === 'about' && <About />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
