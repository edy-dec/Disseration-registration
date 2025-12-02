import { useAuth0 } from '@auth0/auth0-react';
import Auth0LoginButton from './Auth0LoginButton';
import Auth0LogoutButton from './Auth0LogoutButton';
import Auth0Profile from './Auth0Profile';

const Auth0Integration = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#a0aec0'
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '10px',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}>
            🔄
          </div>
          <div style={{ fontSize: '18px', fontWeight: '500' }}>
            Loading Auth0...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: 'rgba(220, 53, 69, 0.1)',
        border: '1px solid rgba(220, 53, 69, 0.3)',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '24px',
          color: '#dc3545',
          marginBottom: '10px'
        }}>
          ❌ Auth0 Error
        </div>
        <div style={{
          color: '#dc3545',
          fontSize: '16px',
          marginBottom: '5px'
        }}>
          Something went wrong with Auth0
        </div>
        <div style={{
          color: '#6c757d',
          fontSize: '14px'
        }}>
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <img 
          src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png" 
          alt="Auth0 Logo" 
          style={{ 
            height: '40px',
            filter: 'brightness(1.2)'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <h2 style={{
          color: '#f7fafc',
          fontSize: '1.8rem',
          fontWeight: '600',
          margin: 0,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          Auth0 Integration
        </h2>
      </div>
      
      {isAuthenticated ? (
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div style={{
            color: '#68d391',
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '10px'
          }}>
            ✅ Successfully authenticated with Auth0!
          </div>
          
          <Auth0Profile />
          
          <Auth0LogoutButton />
        </div>
      ) : (
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{
            color: '#cbd5e0',
            fontSize: '16px',
            lineHeight: '1.6',
            textAlign: 'center',
            margin: 0,
            maxWidth: '400px'
          }}>
            Experience secure authentication with Auth0. 
            Sign in with social providers or email/password.
          </p>
          
          <Auth0LoginButton />
          
          <div style={{
            fontSize: '12px',
            color: '#6c757d',
            marginTop: '10px'
          }}>
            Powered by Auth0 Universal Login
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth0Integration;
