import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const openSidebar = () => {
    document.getElementById("sidebar").style.left = "0";
  }

  const closeSidebar = () => {
    document.getElementById("sidebar").style.left = "-250px";
  }

  return (
    <div style={{ backgroundColor: 'black' }}> {/* Added background color */}
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid justify-content-center">
          <a className="navbar-brand" href="https://www.porsche.com/middle-east/_egypt_/">
            <img src="/Images/porsche logo.png" alt="Porsche" className="navbar-brand-img" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/HTML/Home.html">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/login.html">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="About.jsx">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/contact.html">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/products">Browse</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      

      {/* <div className="sidebar" id="sidebar">
      <header>
          <button className="openbtn" onClick={openSidebar}>
            <span>&gt;</span> 
          </button>
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
      </div> */}

      <div style={{ height: '25%' }} className="car1">
        <video autoPlay loop muted playsInline>
          <source src="/photos gt3/homepage_vid.mp4" type="video/mp4" width="100%" height="100%" />
        </video>
      </div>
      <p className="fs-1 fw-bold"> Models</p>
      <div style={{ height: '25%', width: '100%' }} className="carlos">
        <p className="words">Panamera</p>
        <img src="/Images/porsche-panamera.png" alt="carpa" width="100%" height="100%" />
      </div>
      <div style={{ height: '25%', width: '100%' }} className="carlo2">
        <p className="words"> Taycan</p>
        <img src="/Images/porsche-taycan.png" alt="cartay" width="100%" height="100%" />
      </div>
      <div style={{ height: '25%', width: '100%' }} className="carlo3">
        <p className="words"> 911 carrera⠀</p>
        <img src="/Images/pic1.png" alt="Image 1" width="100%" height="100%" />
      </div>
      <div style={{ height: '25%', width: '100%' }} className="carlo4">
        <p className="words"> Gtsport Porsche 911 turbo s</p>
        <img src="/Images/pic2.png" alt="Image 2" width="100%" height="100%" />
      </div>
    </div>
  );
}

export default Home;
