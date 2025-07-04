import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/constants/api';
import { get, post, put, del } from '@/api/config';

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

export const useExpenseCategories = (options?: { enabled?: boolean }) => {
  const queryClient = useQueryClient();

  // List
  const listQuery = useQuery({
    queryKey: ['expense-categories'],
    queryFn: () => get<any>(API_ENDPOINTS.EXPENSE_CATEGORIES.ROOT),
    select: (res) => res.records.data || [],
    enabled: options?.enabled !== undefined ? options.enabled : true,
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
    list: listQuery.data,
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