import React from 'react';
import { useAuth } from '../../auth/AuthContext';

const ProfessorDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard Profesor</h1>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        border: '1px solid #dee2e6'
      }}>
        <h3>Bun venit, {user?.professorDetails?.title} {user?.name}!</h3>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Tip cont:</strong> Profesor</p>
          {user?.professorDetails && (
            <>
              <p><strong>Departament:</strong> {user.professorDetails.department}</p>
              <p><strong>Titlu:</strong> {user.professorDetails.title}</p>
              {user.professorDetails.researchAreas && user.professorDetails.researchAreas.length > 0 && (
                <p><strong>Domenii de cercetare:</strong> {user.professorDetails.researchAreas.join(', ')}</p>
              )}
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
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>📋 Gestionează Teme</h4>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Creează, editează și publică teme noi de disertație pentru studenți.
          </p>
          <button style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Gestionează Teme
          </button>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>📨 Aplicări Studenți</h4>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Vizualizează și procesează aplicările studenților la temele tale.
          </p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Aplicări Noi
            </button>
            <span style={{ 
              backgroundColor: '#dc3545', 
              color: 'white', 
              borderRadius: '12px', 
              padding: '2px 8px', 
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              0
            </span>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>👥 Studenții Mei</h4>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Monitorizează progresul studenților pe care îi coordonezi.
          </p>
          <button style={{
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Vezi Studenți
          </button>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#495057' }}>📊 Statistici</h4>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Vezi statistici despre temele publicate și studenții coordonați.
          </p>
          <button style={{
            backgroundColor: '#6f42c1',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Statistici
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem',
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem'
      }}>
        <div style={{ 
          backgroundColor: '#d4edda', 
          padding: '1rem', 
          borderRadius: '8px',
          border: '1px solid #c3e6cb'
        }}>
          <h5 style={{ color: '#155724', margin: 0, marginBottom: '0.5rem' }}>✅ Teme Active</h5>
          <p style={{ color: '#155724', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>0</p>
        </div>

        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '1rem', 
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
          <h5 style={{ color: '#856404', margin: 0, marginBottom: '0.5rem' }}>⏳ În Așteptare</h5>
          <p style={{ color: '#856404', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>0</p>
        </div>

        <div style={{ 
          backgroundColor: '#f8d7da', 
          padding: '1rem', 
          borderRadius: '8px',
          border: '1px solid #f5c6cb'
        }}>
          <h5 style={{ color: '#721c24', margin: 0, marginBottom: '0.5rem' }}>👥 Studenți Activi</h5>
          <p style={{ color: '#721c24', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>0</p>
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem',
        backgroundColor: '#d1ecf1', 
        padding: '1rem', 
        borderRadius: '8px',
        border: '1px solid #bee5eb'
      }}>
        <h5 style={{ color: '#0c5460', margin: 0, marginBottom: '0.5rem' }}>💡 Sfaturi pentru profesori:</h5>
        <ul style={{ color: '#0c5460', margin: 0, paddingLeft: '1.5rem' }}>
          <li>Creează teme clare și detaliate pentru a atrage studenții potriviți</li>
          <li>Răspunde prompt la aplicările studenților</li>
          <li>Păstrează o comunicare regulată cu studenții coordonați</li>
          <li>Folosește statisticile pentru a îmbunătăți procesul de coordonare</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
