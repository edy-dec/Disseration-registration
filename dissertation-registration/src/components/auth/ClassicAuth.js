import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { validateEmailDomain } from '../../services/api';
import './ClassicAuth.css';

const ClassicAuth = ({ mode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [detectedUserType, setDetectedUserType] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, register } = useAuth();

  // Reset form când se schimbă modul
  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setDetectedUserType(null);
    setEmailError('');
    setError('');
    setSuccess('');
  }, [mode]);

  // Validează email-ul în timp real
  useEffect(() => {
    if (formData.email) {
      const validation = validateEmailDomain(formData.email);
      if (validation.isValid) {
        setDetectedUserType(validation.userType);
        setEmailError('');
      } else {
        setDetectedUserType(null);
        setEmailError('Email-ul trebuie să fie de la o universitate acceptată');
      }
    } else {
      setDetectedUserType(null);
      setEmailError('');
    }
  }, [formData.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Te rugăm să completezi toate câmpurile obligatorii');
      return false;
    }

    if (mode === 'register') {
      if (!formData.name || !formData.confirmPassword) {
        setError('Te rugăm să completezi toate câmpurile obligatorii');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Parolele nu se potrivesc');
        return false;
      }

      if (formData.password.length < 6) {
        setError('Parola trebuie să aibă minimum 6 caractere');
        return false;
      }

      if (!detectedUserType) {
        setError('Email-ul trebuie să fie de la o universitate acceptată');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await login({
          email: formData.email,
          password: formData.password
        });

        if (result.success) {
          setSuccess('Conectare reușită! Se redirecționează...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          setError(result.message || 'Eroare la conectare');
        }
      } else {
        const result = await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          name: formData.name
        });

        if (result.success) {
          setSuccess('Cont creat cu succes! Se redirecționează...');
          setTimeout(() => {
            if (result.data.requiresProfileCompletion) {
              window.location.href = '/complete-profile';
            } else {
              window.location.href = '/';
            }
          }, 1000);
        } else {
          setError(result.message || 'Eroare la crearea contului');
        }
      }
    } catch (err) {
      setError('A apărut o eroare neașteptată. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeDisplay = (type) => {
    switch(type) {
      case 'student': return '🎓 Student';
      case 'profesor': return '👨‍🏫 Profesor';
      default: return '';
    }
  };

  return (
    <div className="classic-auth">
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email universitar *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="nume@stud.ase.ro sau nume@ase.ro"
            required
            className={emailError ? 'error' : ''}
          />
          
          {detectedUserType && (
            <div className="user-type-detected">
              <span className="type-badge">
                {getUserTypeDisplay(detectedUserType)}
              </span>
              <small>Tip cont detectat automat</small>
            </div>
          )}
          
          {emailError && (
            <div className="field-error">{emailError}</div>
          )}
        </div>

        {/* Nume (doar pentru register) */}
        {mode === 'register' && (
          <div className="form-group">
            <label htmlFor="name">Nume complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ion Popescu"
              required
            />
          </div>
        )}

        {/* Parolă */}
        <div className="form-group">
          <label htmlFor="password">
            Parolă * {mode === 'register' && <small>(minimum 6 caractere)</small>}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            required
            minLength={mode === 'register' ? 6 : undefined}
          />
        </div>

        {/* Confirmare parolă (doar pentru register) */}
        {mode === 'register' && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmă parola *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />
          </div>
        )}

        {/* Erori */}
        {error && (
          <div className="form-message error-message">
            ❌ {error}
          </div>
        )}

        {/* Succes */}
        {success && (
          <div className="form-message success-message">
            ✅ {success}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="submit-button"
          disabled={loading || (mode === 'register' && !detectedUserType)}
        >
          {loading ? (
            <>
              <span className="button-spinner"></span>
              {mode === 'login' ? 'Se conectează...' : 'Se creează contul...'}
            </>
          ) : (
            mode === 'login' ? 'Conectează-te' : 'Creează cont'
          )}
        </button>
      </form>

      {/* Info despre email-uri acceptate */}
      <div className="email-domains-info">
        <details>
          <summary>Vezi domeniile email acceptate</summary>
          <div className="domains-list">
            <div className="domain-group">
              <strong>🎓 Studenți:</strong>
              <div className="domain-tags">
                <span>@stud.ase.ro</span>
                <span>@student.ase.ro</span>
                <span>@student.upt.ro</span>
                <span>@student.utcluj.ro</span>
                <span>@stud.ubbcluj.ro</span>
                <span>@student.upb.ro</span>
              </div>
            </div>
            <div className="domain-group">
              <strong>👨‍🏫 Profesori:</strong>
              <div className="domain-tags">
                <span>@ase.ro</span>
                <span>@ie.ase.ro</span>
                <span>@profesor.ase.ro</span>
                <span>@upt.ro</span>
                <span>@utcluj.ro</span>
                <span>@ubbcluj.ro</span>
                <span>@upb.ro</span>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default ClassicAuth;
