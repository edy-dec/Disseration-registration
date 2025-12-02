import { useAuth0 } from "@auth0/auth0-react";

const Auth0LogoutButton = () => {
  const { logout } = useAuth0();
  
  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      className="button logout auth0-logout"
      style={{
        background: 'linear-gradient(135deg, #ff7675, #d63031)',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 3px 10px rgba(214, 48, 49, 0.3)',
        marginTop: '15px'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 5px 15px rgba(214, 48, 49, 0.4)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 3px 10px rgba(214, 48, 49, 0.3)';
      }}
    >
      🔒 Logout from Auth0
    </button>
  );
};

export default Auth0LogoutButton;
