import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/constants/api';
import { get, post, put, del } from '@/api/config';
import { AxiosHeaders } from 'axios';
import qs from 'qs';

export interface Expense {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  description?: string;
  date: string;
  expense_date?: string;
  created_at?: string;
  updated_at?: string;
  title?: string;
  payment_method?: string;
  location?: string;
  receipt_image?: string;
  is_recurring?: boolean;
  recurring_type?: string;
  category?: {
    id: string;
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  };
}

export const useExpenses = (param: any) => {
  const queryClient = useQueryClient();

  // List
  const listQuery = useQuery({
    queryKey: ['expenses', param],
    enabled: !!param.current && !!param.pageSize,
    queryFn: () => get<any>(`${API_ENDPOINTS.EXPENSES.ROOT}?${qs.stringify(param)}`),
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
    },
  });

  // Create
  const createMutation = useMutation({
    mutationFn: (payload: Partial<Expense> | FormData) => {
      let headers = undefined;
      if (payload instanceof FormData) {
        headers = new AxiosHeaders({ 'Content-Type': 'multipart/form-data' });
      }
      return post(API_ENDPOINTS.EXPENSES.ROOT, payload, headers);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'] })
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: (payload: Partial<Expense>) => put(API_ENDPOINTS.EXPENSES.DETAIL(payload.id!), payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'] })
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => del(API_ENDPOINTS.EXPENSES.DETAIL(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'] })
  });

  const removeWithCallback = (id: string, options?: { onSuccess?: () => void }) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['expenses'] });
        options?.onSuccess?.();
      }
    });
  };

  return {
    list: listQuery.data?.data,
    meta: listQuery.data?.meta,
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    create: createMutation.mutate,
    isCreating: createMutation.isPending,
    update: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    remove: removeWithCallback,
    isRemoving: deleteMutation.isPending,
    refetch: listQuery.refetch,
  };
}; 