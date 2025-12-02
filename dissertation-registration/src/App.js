import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfileCompletion from "./components/auth/ProfileCompletion";
import Auth0Integration from "./auth/Auth0Integration";

import { AuthProvider, useAuth } from "./auth/AuthContext";

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Dissertation App
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li style={{ color: "white", alignSelf: "center" }}>
              Salut, {user?.name} ({user?.userType})
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
            </li>            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/auth0-demo" className="nav-link" style={{color: '#63b3ed'}}>
                🚀 Auth0 Demo
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
          <Routes>            {/* Rute publice */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth0-demo" element={<Auth0Integration />} />

            {/* Rute protejate */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/complete-profile" 
              element={
                <ProtectedRoute>
                  <ProfileCompletion />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/about" 
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>    </AuthProvider>
  );
}

export default App;
