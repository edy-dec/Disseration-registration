import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulare verificare date (în realitate ai face un request la server aici)
    if (username === "admin" && password === "1234") {
      onLogin(); // Apelăm funcția care schimbă starea în App.js
      navigate("/"); // Redirecționăm utilizatorul către Home
    } else {
      setError("Date incorecte! Încearcă admin / 1234");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Autentificare</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Parola:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-login">
          Intră în cont
        </button>
      </form>
    </div>
  );
};

export default Login;
