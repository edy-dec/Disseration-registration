import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  // Afișează spinner pe timpul de încărcare
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Se încarcă...</div>
      </div>
    );
  }

  // Dacă nu e autentificat, redirecționează la login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Dacă e autentificat, afișează componenta
  return children;
};

export default ProtectedRoute;
