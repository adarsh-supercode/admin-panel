// components/LogoutButton.js

import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Attempting to logout...");
    document.cookie = 'token=; Max-Age=0; path=/;'; // Clear the token
    console.log("Logout: Token cleared"); // Confirm token is cleared
    router.push('/login');
  };
  
  return (
    <button onClick={handleLogout} style={{ marginTop: '20px' }}>
      Logout
    </button>
  );
};

export default LogoutButton;
