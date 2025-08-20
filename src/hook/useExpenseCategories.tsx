import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/constants/api';
import { get, post, put, del } from '@/api/config';
import qs from 'qs';

export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const useExpenseCategories = (param?: any) => {
  const queryClient = useQueryClient();

  // List
  const listQuery = useQuery({
    queryKey: ['expense-categories', param],
    enabled: !!param && Object.values(param).every(value => value !== undefined && value !== null),
    queryFn: () => get<any>(`${API_ENDPOINTS.EXPENSE_CATEGORIES.ROOT}?${qs.stringify(param)}`),
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

  // Create
  const createMutation = useMutation({
    mutationFn: (payload: Partial<ExpenseCategory>) => post(API_ENDPOINTS.EXPENSE_CATEGORIES.ROOT, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expense-categories'] })
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: (payload: Partial<ExpenseCategory>) => put(API_ENDPOINTS.EXPENSE_CATEGORIES.DETAIL(payload.id!), payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expense-categories'] })
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => del(API_ENDPOINTS.EXPENSE_CATEGORIES.DETAIL(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expense-categories'] })
  });

  return {
    list: listQuery.data?.data,
    meta: listQuery.data?.meta,
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    create: createMutation.mutate,
    isCreating: createMutation.isPending,
    update: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    remove: deleteMutation.mutate,
    isRemoving: deleteMutation.isPending,
    refetch: listQuery.refetch,
  };
}; 