import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import ClassicAuth from './ClassicAuth';
import './LoginPage.css';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { isAuthenticated, loading } = useAuth();

  // Redirecționează dacă e deja autentificat
  useEffect(() => {
    if (isAuthenticated && !loading) {
      window.location.href = '/';
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="login-loading">
        <div className="spinner"></div>
        <p>Se încarcă...</p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Dissertation Registration</h1>
          <p className="login-subtitle">
            Sistem de înregistrare pentru disertații - ASE București
          </p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Conectează-te
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Creează cont
          </button>
        </div>

        <div className="login-content">
          <ClassicAuth mode={activeTab} />
        </div>

        <div className="login-info">
          <div className="info-box">
            <h3>ℹ️ Informații importante</h3>
            <ul>
              <li>Tipul de cont se determină automat pe baza email-ului universitar</li>
              <li>Studenți: folosiți email-ul @stud.ase.ro</li>
              <li>Profesori: folosiți email-ul @ase.ro sau @ie.ase.ro</li>
              <li>După înregistrare va trebui să completați profilul</li>
            </ul>
          </div>
        </div>

        <div className="login-footer">
          <p>© 2024 ASE București - Facultatea de Cibernetică, Statistică și Informatică Economică</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
