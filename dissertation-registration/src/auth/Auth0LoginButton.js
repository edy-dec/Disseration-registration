import { useAuth0 } from "@auth0/auth0-react";

const Auth0LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <button 
      onClick={() => loginWithRedirect()} 
      className="button login auth0-login"
      style={{
        background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(238, 90, 36, 0.3)',
        marginTop: '10px'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px rgba(238, 90, 36, 0.4)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 15px rgba(238, 90, 36, 0.3)';
      }}
    >
      🚀 Login with Auth0
    </button>
  );
};

export default Auth0LoginButton;
