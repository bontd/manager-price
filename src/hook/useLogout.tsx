// hooks/useLogout.ts
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { removeCookie } from '@/utils/helper/storage';
import { post } from '@/api/config';
import { API_ENDPOINTS } from '@/utils/constants/api';
import { useTranslation } from 'react-i18next';

export const useLogout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = () => {
    // Clear all authentication data immediately
    removeCookie('token');
    removeCookie('refreshToken');
    removeCookie('userInfo');
    
    // Clear any other stored data
    localStorage.clear();
    sessionStorage.clear();
    
    // Show success message
    message.success(t('axios.success.logout'));
    
    // Redirect to login page immediately
    navigate('/login');
    
    // Call logout API in background (fire and forget)
    post(API_ENDPOINTS.AUTH.LOGOUT).catch((error) => {
      console.error('Background logout API call failed:', error);
      // Don't show error to user since they're already logged out
    });
  };

  return logout;
};
