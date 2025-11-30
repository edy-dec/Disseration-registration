import React from 'react';
import { useAuth } from '../../auth/AuthContext';

const RoleBasedRoute = ({ children, allowedRoles = [], fallbackPath = '/' }) => {
  const { user, userType, isAuthenticated, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>
          Se verifică permisiunile...
        </p>
      </div>
    );
  }

  // Dacă nu e autentificat
  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  // Dacă nu are rolul necesar
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        color: '#495057'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>
            🚫 Acces interzis
          </h2>
          <p style={{ marginBottom: '20px', lineHeight: '1.5' }}>
            Nu ai permisiunea să accesezi această pagină.
          </p>
          <p style={{ marginBottom: '30px', fontSize: '14px', color: '#6c757d' }}>
            Această funcționalitate este disponibilă doar pentru: {allowedRoles.join(', ')}
          </p>
          <button
            onClick={() => window.location.href = fallbackPath}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Înapoi la pagina principală
          </button>
        </div>
      </div>
    );
  }

  // Dacă are rolul necesar, afișează componenta
  return children;
};

// Componente specifice pentru roluri
export const StudentOnly = ({ children, fallbackPath = '/' }) => {
  return (
    <RoleBasedRoute allowedRoles={['student']} fallbackPath={fallbackPath}>
      {children}
    </RoleBasedRoute>
  );
};

export const ProfessorOnly = ({ children, fallbackPath = '/' }) => {
  return (
    <RoleBasedRoute allowedRoles={['profesor']} fallbackPath={fallbackPath}>
      {children}
    </RoleBasedRoute>
  );
};

export default RoleBasedRoute;
