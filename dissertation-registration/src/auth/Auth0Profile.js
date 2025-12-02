import { useAuth0 } from "@auth0/auth0-react";

const Auth0Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: '#a0aec0',
        fontSize: '16px',
        padding: '20px'
      }}>
        Loading Auth0 profile...
      </div>
    );
  }

  return (
    isAuthenticated && user ? (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '15px',
        padding: '2rem',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <img 
          src={user.picture || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%2363b3ed'/%3E%3Cpath d='M60 55c9.94 0 18-8.06 18-18s-8.06-18-18-18-18 8.06-18 18 8.06 18 18 18zm0 9c-12 0-36 6.02-36 18v4.5c0 2.49 2.01 4.5 4.5 4.5h63c2.49 0 4.5-2.01 4.5-4.5V82c0-11.98-24-18-36-18z' fill='%23fff'/%3E%3C/svg%3E`} 
          alt={user.name || 'User'} 
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '4px solid #63b3ed',
            boxShadow: '0 4px 20px rgba(99, 179, 237, 0.3)',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
          onError={(e) => {
            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%2363b3ed'/%3E%3Cpath d='M60 55c9.94 0 18-8.06 18-18s-8.06-18-18-18-18 8.06-18 18 8.06 18 18 18zm0 9c-12 0-36 6.02-36 18v4.5c0 2.49 2.01 4.5 4.5 4.5h63c2.49 0 4.5-2.01 4.5-4.5V82c0-11.98-24-18-36-18z' fill='%23fff'/%3E%3C/svg%3E`;
          }}
        />
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            color: '#f7fafc', 
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' 
          }}>
            {user.name || user.nickname || 'Auth0 User'}
          </div>
          
          <div style={{ 
            fontSize: '1.15rem', 
            color: '#cbd5e0',
            marginBottom: '0.5rem' 
          }}>
            {user.email}
          </div>
          
          {user.email_verified && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(72, 187, 120, 0.2)',
              color: '#68d391',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              border: '1px solid rgba(72, 187, 120, 0.3)'
            }}>
              ✅ Verified Email
            </div>
          )}
        </div>
        
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          padding: '12px',
          width: '100%',
          fontSize: '12px',
          color: '#a0aec0'
        }}>
          <div><strong>Provider:</strong> Auth0</div>
          {user.sub && <div><strong>User ID:</strong> {user.sub}</div>}
          {user.updated_at && (
            <div><strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleDateString()}</div>
          )}
        </div>
      </div>
    ) : null
  );
};

export default Auth0Profile;
