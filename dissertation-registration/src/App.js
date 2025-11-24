import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";

import Login from "./views/Login";
import Home from "./views/Home";

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
    <Router>
      <nav className="navbar">
        <Link to="/" className="logo">
          My App
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
