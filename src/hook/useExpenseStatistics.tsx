import { useQuery } from '@tanstack/react-query';
import { get } from '@/api';
import { API_ENDPOINTS } from '@/utils/constants/api';

export interface CategoryStatistics {
  category_id: string;
  category_name: string;
  total_amount: string;
  count: number;
}

export interface DailyStatistics {
  date: string;
  total_amount: string;
  count: number;
}

export interface PaymentMethodStatistics {
  date: string;
  total_amount: string;
  count: number;
  payment_method: string;
}

export interface ExpenseStatistics {
  total_amount: string;
  total_count: number;
  average_amount: number;
  category_statistics: CategoryStatistics[];
  daily_statistics: DailyStatistics[];
  payment_method_statistics: PaymentMethodStatistics[];
  period: string;
}

export interface ExpenseStatisticsResponse {
  status: number;
  message: string;
  data: ExpenseStatistics;
}

// Fetch function for react-query
const fetchExpenseStatistics = async (period: string): Promise<ExpenseStatistics> => {
  const response = await get<ExpenseStatisticsResponse>(
    API_ENDPOINTS.EXPENSES.STATISTICS(period)
  );
  return response.records.data;
};

export const useExpenseStatistics = (period: string = 'month') => {
  const {
    data: statistics,
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['expense-statistics', period],
    queryFn: () => fetchExpenseStatistics(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    statistics,
    loading,
    error: error ? (error as Error).message : null,
    refetch
  };
}; 