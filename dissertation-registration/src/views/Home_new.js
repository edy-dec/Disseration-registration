import React from "react";
import { useAuth } from "../auth/AuthContext";
import StudentDashboard from "../components/student/StudentDashboard";
import ProfessorDashboard from "../components/professor/ProfessorDashboard";

const Home = () => {
  const { user, userType, requiresProfileCompletion } = useAuth();

  // Dacă utilizatorul trebuie să completeze profilul, afișăm un mesaj
  if (requiresProfileCompletion) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem',
        backgroundColor: '#fff3cd',
        borderRadius: '8px',
        border: '1px solid #ffeaa7',
        margin: '2rem'
      }}>
        <h2 style={{ color: '#856404' }}>Profil Incomplet</h2>
        <p style={{ color: '#856404' }}>
          Pentru a accesa aplicația, trebuie să îți completezi profilul.
        </p>
        <button 
          onClick={() => window.location.href = '/complete-profile'}
          style={{
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Completează Profilul
        </button>
      </div>
    );
  }

  // Afișează dashboard-ul corespunzător tipului de utilizator
  if (userType === 'student') {
    return <StudentDashboard />;
  } else if (userType === 'profesor') {
    return <ProfessorDashboard />;
  }

  // Fallback pentru utilizatori fără tip definit
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Bun venit în aplicația de disertații!</h2>
      <p>Tipul contului tău nu a fost detectat. Te rugăm să contactezi administratorul.</p>
    </div>
  );
};

export default Home;
