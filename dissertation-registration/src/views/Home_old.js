import React from "react";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const { user, userType, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getUserTypeDisplay = (type) => {
    switch(type) {
      case 'student': return '🎓 Student';
      case 'profesor': return '👨‍🏫 Profesor';
      default: return 'Utilizator';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Dissertation Registration</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>ASE București - CSIE</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '600' }}>{user?.name}</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {getUserTypeDisplay(userType)}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>
            Bun venit, {user?.name}! 👋
          </h2>
          
          <div style={{
            background: userType === 'student' ? '#e3f2fd' : '#f3e5f5',
            border: `1px solid ${userType === 'student' ? '#bbdefb' : '#e1bee7'}`,
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <h3 style={{ 
              color: userType === 'student' ? '#1976d2' : '#7b1fa2', 
              margin: '0 0 15px 0' 
            }}>
              {getUserTypeDisplay(userType)}
            </h3>
            <p style={{ margin: 0, lineHeight: '1.6' }}>
              {userType === 'student' 
                ? 'Aici poți găsi și aplica la temele de disertație disponibile, să-ți urmărești progresul și să comunici cu profesorul coordonator.'
                : 'Aici poți crea și gestiona temele de disertație, să vezi aplicările studenților și să coordonezi procesul de disertație.'
              }
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {userType === 'student' ? (
              <>
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  textAlign: 'center'
                }}>
                  <h4>📚 Teme Disponibile</h4>
                  <p style={{ fontSize: '14px', color: '#6c757d' }}>
                    Explorează temele de disertație disponibile
                  </p>
                  <button style={{
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    Vezi Teme
                  </button>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  textAlign: 'center'
                }}>
                  <h4>📝 Aplicările Mele</h4>
                  <p style={{ fontSize: '14px', color: '#6c757d' }}>
                    Urmărește statusul aplicărilor tale
                  </p>
                  <button style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    Vezi Status
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  textAlign: 'center'
                }}>
                  <h4>📋 Gestionare Teme</h4>
                  <p style={{ fontSize: '14px', color: '#6c757d' }}>
                    Creează și gestionează temele de disertație
                  </p>
                  <button style={{
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    Gestionare Teme
                  </button>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  textAlign: 'center'
                }}>
                  <h4>👥 Aplicări Studenți</h4>
                  <p style={{ fontSize: '14px', color: '#6c757d' }}>
                    Vezi și gestionează aplicările studenților
                  </p>
                  <button style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    Vezi Aplicări
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Status Info */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px'
          }}>
            <h4 style={{ color: '#856404', margin: '0 0 10px 0' }}>
              ℹ️ Sistem în dezvoltare
            </h4>
            <p style={{ margin: 0, color: '#856404' }}>
              Momentan sistemul de autentificare este complet funcțional! 
              Următorii pași vor include implementarea funcționalităților specifice pentru {userType === 'student' ? 'studenți' : 'profesori'}.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
