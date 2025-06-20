import qs from 'qs';
import { get } from '@/api/config';
import { useQuery } from '@tanstack/react-query';

export const useUserList = (param: any) => {
  return useQuery({
    queryKey: ['userList', param],
    queryFn: () => get(`/api/list-users?${qs.stringify(param)}`),
    select: (res: any) => res?.records.data || [],
  });
};
