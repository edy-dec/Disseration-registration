import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";

import { AuthProvider, useAuth } from "./auth/AuthContext";

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        My App
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        {user ? (
          <>
            <li style={{ color: "white", alignSelf: "center" }}>
              Salut, {user.name}
            </li>
            <li>
              <button onClick={logout} className="nav-link btn-logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const About = () => (
  <div className="container">
    <h2>About Page</h2>
  </div>
);
const Contact = () => (
  <div className="container">
    <h2>Contact Page</h2>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />

            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
