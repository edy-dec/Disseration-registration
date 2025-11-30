import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [emailValidation, setEmailValidation] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();
  // Funcție pentru validarea domeniului email-ului
  const validateEmailDomain = (email) => {
    const studentDomains = [
      '@stud.ase.ro',
      '@student.ase.ro', 
      '@student.upt.ro',
      '@student.utcluj.ro',
      '@stud.ubbcluj.ro',
      '@student.upb.ro'
    ];
    
    const professorDomains = [
      '@ase.ro',
      '@ie.ase.ro',
      '@profesor.ase.ro',
      '@upt.ro',
      '@utcluj.ro',
      '@ubbcluj.ro',
      '@upb.ro'
    ];
    
    const emailLower = email.toLowerCase();
    
    for (const domain of studentDomains) {
      if (emailLower.endsWith(domain)) {
        return { isValid: true, userType: 'student' };
      }
    }
    
    for (const domain of professorDomains) {
      if (emailLower.endsWith(domain)) {
        return { isValid: true, userType: 'profesor' };
      }
    }
    
    return { isValid: false, userType: null };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validare automată email
    if (name === 'email' && value) {
      const validation = validateEmailDomain(value);
      setEmailValidation(validation);
    } else if (name === 'email' && !value) {
      setEmailValidation(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Parolele nu coincid!");
      return;
    }

    if (!emailValidation || !emailValidation.isValid) {
      setError("Folosește email-ul universității pentru înregistrare!");
      return;
    }    try {
      const result = await register(formData);
      
      if (result.success) {
        // Înregistrare reușită
        if (result.data.requiresProfileCompletion) {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }      } else {
        if (result.message && result.message.includes('Datele introduse nu sunt valide')) {
          // Afișează erorile specifice
          const errorDetails = result.errors || [];
          const errorMessages = errorDetails.map(err => err.msg).join('. ');
          setError(errorMessages || result.message);
        } else {
          setError(result.message || "Eroare la înregistrare");
        }
      }
    } catch (err) {
      setError("Eroare la server.");
    }
  };
  return (
    <div className="auth-container">
      <h2>Înregistrare Cont</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div style={{ marginBottom: '1rem', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '6px', fontSize: '0.9rem', color: '#2c3e50' }}>
        💡 <strong>Info:</strong> Tipul de cont se determină automat pe baza email-ului universității
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Nume:</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
          {emailValidation && emailValidation.isValid && (
            <div style={{ marginTop: '5px', padding: '8px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', fontSize: '0.85rem' }}>
              ✅ Email valid - Tip cont: <strong>{emailValidation.userType === 'student' ? 'Student' : 'Profesor'}</strong>
            </div>
          )}
          {emailValidation && !emailValidation.isValid && (
            <div style={{ marginTop: '5px', padding: '8px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', fontSize: '0.85rem' }}>
              ❌ Email-ul trebuie să fie de la o universitate acceptată
            </div>
          )}
        </div>        <div className="form-group">
          <label>Parolă:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <div style={{ marginTop: '5px', padding: '8px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '4px', fontSize: '0.8rem' }}>
            ⚠️ Parola trebuie să conțină: literă mică, literă mare, cifră (min. 6 caractere)
          </div>
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
