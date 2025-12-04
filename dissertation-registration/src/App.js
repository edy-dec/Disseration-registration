import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfileCompletion from "./components/auth/ProfileCompletion";
import { AuthProvider, useAuth } from "./auth/AuthContext";

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Dissertation Registration System
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
    <h2>About Dissertation Registration</h2>
    <p>This system allows students and professors to register for dissertations.</p>
  </div>
);

const Contact = () => (
  <div className="container">
    <h2>Contact Information</h2>
    <p>For support, please contact your academic advisor.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container">
          <Routes>
            {/* Rute publice */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
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
      </Router>
    </AuthProvider>
  );
}

export default App;
