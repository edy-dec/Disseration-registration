import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Parolele nu coincid!");
      return;
    }

    // --- LOGICA DE BACKEND AICI ---
    console.log("Register data:", formData);

    // După înregistrare, trimitem utilizatorul la Login
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Înregistrare Cont</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Nume:</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Parolă:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmă Parola:</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Înregistrează-te
        </button>
      </form>
    </div>
  );
};

export default Register;
