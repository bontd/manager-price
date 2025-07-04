// hooks/useLogout.ts
import { useNavigate } from 'react-router-dom';
import { removeCookie, getToken } from '@/utils/helper/storage';
import { post } from '@/api/config';
import { API_ENDPOINTS } from '@/utils/constants/api';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    // Lấy token trước khi xóa
    const token = getToken();

    // Xóa toàn bộ dữ liệu xác thực ngay lập tức
    removeCookie('token');
    removeCookie('refreshToken');
    removeCookie('userInfo');
    localStorage.clear();
    sessionStorage.clear();

    queryClient.clear();

    // Chuyển hướng sang trang đăng nhập ngay lập tức
    navigate('/login');

    // Gọi API logout ở chế độ fire-and-forget, truyền token vào header
    if (token) {
      post(
        API_ENDPOINTS.AUTH.LOGOUT,
        undefined,
        { Authorization: `Bearer ${token}` } as import('axios').AxiosRequestHeaders
      ).catch((error) => {
        console.error('Background logout API call failed:', error);
        // Không hiển thị lỗi cho người dùng vì đã logout
      });
    }
  };

  return logout;
};
