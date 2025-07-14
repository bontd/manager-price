import { useQuery } from '@tanstack/react-query';
import { get } from '@/api';
import { API_ENDPOINTS } from '@/utils/constants/api';

export interface ExpenseByCategory {
  category_id: string;
  category_name: string;
  total_amount: string;
  count: number;
}

export interface ExpenseDailyStatistics {
  date: string;
  total_amount: string;
  count: number;
}

export interface ExpensePaymentMethodStatistics {
  date: string;
  total_amount: string;
  count: number;
  payment_method: string;
}

export interface ExpenseStatistics {
  total_income: number;
  total_expense: string;
  balance: number;
  income_count: number;
  expense_count: number;
  income_by_category: any[];
  expense_by_category: ExpenseByCategory[];
  expense_daily_statistics: ExpenseDailyStatistics[];
  expense_payment_method_statistics: ExpensePaymentMethodStatistics[];
  period: string;
  filters_applied: any[];
}

export interface ExpenseStatisticsResponse {
  status: number;
  message: string;
  data: ExpenseStatistics;
}

export interface ExpenseStatisticsFilters {
  period?: string;
  start_date?: string;
  end_date?: string;
  category?: string;
  payment_method?: string;
  min_amount?: number;
  max_amount?: number;
}

// Fetch function for react-query
const fetchExpenseStatistics = async (filters: ExpenseStatisticsFilters): Promise<ExpenseStatistics> => {
  const response = await get<ExpenseStatisticsResponse>(
    API_ENDPOINTS.EXPENSES.STATISTICS(filters)
  );
  return response.records.data;
};

export const useExpenseStatistics = (filters: ExpenseStatisticsFilters = { period: 'month' }) => {
  const {
    data: statistics,
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['expense-statistics', filters],
    queryFn: () => fetchExpenseStatistics(filters),
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