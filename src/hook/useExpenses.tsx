import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/constants/api';
import { get, post, put, del } from '@/api/config';
import { AxiosHeaders } from 'axios';

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

export const useExpenses = () => {
  const queryClient = useQueryClient();

  // List
  const listQuery = useQuery({
    queryKey: ['expenses'],
    queryFn: () => get<any>(API_ENDPOINTS.EXPENSES.ROOT),
    select: (res) => res.records?.data || [],
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
    list: listQuery.data,
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