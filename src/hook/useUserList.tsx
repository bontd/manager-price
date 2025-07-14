import qs from 'qs';
import { del, get, patch } from '@/api/config';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/constants/api';

export const useUserList = (param: any) => {
  const fetchUserList = useQuery({
    queryKey: ['userList', param],
    queryFn: () => get(`${API_ENDPOINTS.USER.ROOT}?${qs.stringify(param)}`),
    select: (res: any) => {
      return {
        data: res?.records.data || [],
        meta: {
          currentPage: Number(res?.headers['x-current-page']),
          pageCount: Number(res?.headers['x-page-count']),
          perPage: Number(res?.headers['x-per-page']),
          rateLimit: Number(res?.headers['x-ratelimit-limit']),
          rateRemaining: Number(res?.headers['x-ratelimit-remaining']),
          totalCount: Number(res?.headers['x-total-count']),
        }
      }
    }
  });

  const updateStatus = async (id: string, status: string) => {
    const res: any = await patch(`${API_ENDPOINTS.USER.STATUS(id)}`, { status });
    if (res.status === 200) {
      fetchUserList.refetch();
      return true;
    }
    return false;
  };
  
  const deleteUser = async (id: string | null) => {
    if (!id) return;
    const res: any = await del(`${API_ENDPOINTS.USER.ROOT}/${id}`);
    if (res.status === 200) {
      fetchUserList.refetch();
      return true;
    }
    return false;
  };

  return {
    list: fetchUserList.data?.data,
    meta: fetchUserList.data?.meta,
    isLoading: fetchUserList.isLoading,
    error: fetchUserList.error,
    refetch: fetchUserList.refetch,
    updateStatus,
    deleteUser
  };
};
