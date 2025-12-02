import React from 'react';
import { useAuth } from '../../auth/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard Student</h1>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        border: '1px solid #dee2e6'
      }}>
        <h3>Bun venit, {user?.name}!</h3>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Tip cont:</strong> Student</p>
          {user?.studentDetails && (
            <>
              <p><strong>ID Student:</strong> {user.studentDetails.universityId}</p>
              <p><strong>Facultatea:</strong> {user.studentDetails.faculty}</p>
              <p><strong>Anul:</strong> {user.studentDetails.year}</p>
              <p><strong>Specializarea:</strong> {user.studentDetails.specialization}</p>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>🔍 Caută Teme</h4>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Explorează temele de disertație disponibile și aplică la cele care te interesează.
          </p>
          <button style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Vizualizează Teme
          </button>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>📄 Aplicările Mele</h4>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Vezi statusul aplicărilor tale la diferite teme de disertație.
          </p>
          <button style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Aplicările Mele
          </button>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>📝 Disertația Mea</h4>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Gestionează progresul disertației tale și comunicarea cu coordonatorul.
          </p>
          <button style={{
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Vezi Progress
          </button>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>📁 Documente</h4>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Încarcă și gestionează documentele necesare pentru disertație.
          </p>
          <button style={{
            backgroundColor: '#6f42c1',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Documente
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem',
        backgroundColor: '#d1ecf1', 
        padding: '1rem', 
        borderRadius: '8px',
        border: '1px solid #bee5eb'
      }}>
        <h5 style={{ color: '#0c5460', margin: 0, marginBottom: '0.5rem' }}>💡 Sfaturi:</h5>
        <ul style={{ color: '#0c5460', margin: 0, paddingLeft: '1.5rem' }}>
          <li>Citește cu atenție descrierea fiecărei teme înainte să aplici</li>
          <li>Poți aplica la mai multe teme, dar ai grijă la termenele limită</li>
          <li>Păstrează-ți documentele întotdeauna actualizate</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
