import React, { useState } from "react";
import { useAuth } from "./AuthContext.js";
import { useNavigate } from "react-router-dom";
import Auth0LoginButton from "./Auth0LoginButton";

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
      const result = await login(formData);
      
      if (result.success) {
        // Login reușit - redirecționează
        if (result.data.requiresProfileCompletion) {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      } else {
        setError(result.message || "Date de logare invalide");
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
        </div>        <button type="submit" className="btn-primary">
          Login Clasic
        </button>
      </form>
      
      <div style={{ 
        margin: '2rem 0', 
        textAlign: 'center', 
        color: '#666',
        position: 'relative'
      }}>
        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #eee' }} />
        <span style={{ 
          background: 'white', 
          padding: '0 1rem', 
          fontSize: '14px',
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          sau
        </span>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', color: '#666', fontSize: '14px' }}>
          Autentificare rapidă cu Auth0
        </p>
        <Auth0LoginButton />
      </div>
    </div>
  );
};

export default Login;
