import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  const openSidebar = () => {
    document.getElementById("sidebar").style.left = "0";
  }

  const closeSidebar = () => {
    document.getElementById("sidebar").style.left = "-250px";
  }

  return (
    <div>
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
                <a className="nav-link active" aria-current="page" href="/Home.jsx">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/login.html">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/about.html">About</a>
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

      <div className="sidebar" id="sidebar">
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
          <li className="item"><a href="/HTML/profile.html"><i className="bi bi-envelope">Profile</i></a></li>
        </ul>
        <div className="sidebar-footer">
          <a href="/HTML/login.html"><i className="bi bi-door-open"></i> Login</a>
          <a href="/HTML/register.html"><i className="bi bi-person-plus"></i> Sign Up</a>
        </div>
      </div>
      <div className="overlay" id="overlay" onClick={closeSidebar}></div> */}

      <div className="header">
        <p className="fs-1 fw-bold animated-text">About us</p>
        <div className="tc text-box" id="tc">
          <p className="fw-normal animated-text">Welcome to the dynamic universe of Porsche, where innovation meets adrenaline
            and every drive tells a captivating tale. Our journey is one fueled by a relentless pursuit of excellence, where
            each model embodies the spirit of performance and the thrill of the open road.
          </p>
          <p className="fw-normal animated-text">
            In our world, legends aren't just born they're forged. Take for instance, the remarkable Sally, the spirited
            embodiment of Porsche, a vibrant character from the legendary Disney-Pixar movie franchise "Cars" Sally is an
            embodiment of our brand's essence, a fusion of elegance, sophistication, and a passion for the road less
            traveled. Just like Sally, our cars are symbols of freedom, adventure, and the pursuit of dreams.
            At Porsche, we're not just makers of exceptional automobiles, we're creators of experiences. Did you know that
            Porsche has a storied history that dates back to 1931? Founded by Ferdinand Porsche, our company has been at the
            forefront of automotive engineering, pioneering groundbreaking technologies, and redefining what it means to
            drive.
          </p>
          <p className="fw-normal animated-text">
            From the iconic Porsche 911 to the commanding presence of the Cayenne, each model is a testament to our
            unwavering commitment to craftsmanship and performance. Our dedication to innovation has earned us numerous
            accolades, including countless victories on the racetrack and prestigious awards for design and engineering
            excellence.
            But our story doesn't end with our cars it begins with our community, a diverse tapestry of enthusiasts,
            visionaries, and dreamers united by a shared love for driving. Here, connections are forged, friendships are
            made, and memories are created that last a lifetime.
            So, whether you're a seasoned aficionado or a curious explorer, we invite you to join us on this exhilarating
            journey. Discover the legacy, embrace the passion, and experience the thrill of Porsche like never before.
            Welcome to a world where every drive is an adventure and every journey is a story waiting to be told. Welcome to
            Porsche.
          </p>
          <div className="overlay"></div>
        </div>
      </div>
    </div>
  );
}

export default About;
