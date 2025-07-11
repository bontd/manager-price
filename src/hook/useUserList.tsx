import qs from 'qs';
import { get } from '@/api/config';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/constants/api';

export const useUserList = (param: any) => {
  const fetchUserList = useQuery({
    queryKey: ['userList', param],
    queryFn: () => get(`${API_ENDPOINTS.USER.ROOT}?${qs.stringify(param)}`),
    select: (res: any) => ({
      data: res?.records.data || [],
      meta: res?.records.meta || {}
    }),
  });
  return {
    list: fetchUserList.data?.data,
    meta: fetchUserList.data?.meta,
    isLoading: fetchUserList.isLoading,
    error: fetchUserList.error,
    refetch: fetchUserList.refetch,
  };
};
