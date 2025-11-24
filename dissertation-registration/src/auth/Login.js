import React, { useState } from "react";
import { useAuth } from "./AuthContext.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // --- AICI LEGI DE BACKEND ---
      // const response = await fetch('http://localhost:5000/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      // SIMULARE SUCCES (Sterge liniile astea cand ai backend)
      const data = { token: "abc-123-jwt-fake", user: { name: "Student" } };

      if (data.token) {
        login(data.token, data.user);
        navigate("/"); // Redirecționează către Home
      } else {
        setError("Date de logare invalide");
      }
    } catch (err) {
      setError("Eroare la server.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Autentificare</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Parolă:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
