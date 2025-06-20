// hooks/useLogout.ts
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear localStorage or tokens
    console.log('Logging out...');
    
    // Optionally clear cookies
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login
    navigate('/login');
  };

  return logout;
};
