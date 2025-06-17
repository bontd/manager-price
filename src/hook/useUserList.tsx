import { get } from '@/api/config';
import { useQuery } from '@tanstack/react-query';

export const useUserList = () => {
  return useQuery({
    queryKey: ['userList'],
    queryFn: () => get('/api/list-users?current=1&pageSize=10'),
    select: (res: any) => res?.records.result || [],
  });
};
