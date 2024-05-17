import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backend_url = "http://localhost:3000/api/v1";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loggingIn = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${backend_url}/CustLogin`, {
        username: username,
        password: password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="login.css" />
      <title>Login/Register Page</title>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
        style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}
      >
        <div className="container-fluid justify-content-center">
          <a
            className="navbar-brand"
            href="https://www.porsche.com/middle-east/_egypt_/"
          >
            <img
              src="/Images/porsche logo.png"
              alt="Porsche"
              className="navbar-brand-img"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/HTML/Home.html"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/login.html">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/about.html">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/contact.html">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/HTML/products.html">
                  Browse
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="sidebar" id="sidebar">
        <header>
          <button className="openbtn" onClick="openSidebar()">
            <i className="bi bi-list" />
          </button>
          <button className="closebtn" aria-label="Close" onClick="closeSidebar()">
            <span aria-hidden="true"></span>
          </button>
        </header>
        <ul className="menu">
          <li className="item">
            <a href="/HTML/Home.html">
              <i className="bi bi-house-door" /> Home
            </a>
          </li>
          <li className="item">
            <a href="/HTML/about.html">
              <i className="bi bi-info-circle" /> About
            </a>
          </li>
          <li className="item">
            <a href="/HTML/contact.html">
              <i className="bi bi-envelope" /> Contact us
            </a>
          </li>
          <li className="item">
            <a href="/profile">
              <i className="bi bi-envelope">Profile</i>
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a href="/HTML/login.html">
            <i className="bi bi-door-open" /> Login
          </a>
          <a href="/HTML/register.html">
            <i className="bi bi-person-plus" /> Sign Up
          </a>
        </div>
      </div>
      <div className="overlay" id="overlay" onClick="closeSidebar()" />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-md-4">
            <div className="login-form">
              <h2>Login</h2>
              <form id="loginForm" onSubmit={loggingIn}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    className="form-control"
                    id="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    className="form-control"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="loginBtn">
                  Login
                </button>
              </form>
              {error && <div className="alert alert-danger">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
