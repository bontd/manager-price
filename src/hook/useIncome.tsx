import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/utils/constants/api";
import { del, get, patch, post } from "@/api/config";
import qs from "qs";

export interface Income {
    id?: string;
    user_id?: string;
    category_id?: string;
    amount?: number;
    description?: string;
    current?: string | number | null;
    pageSize?: string | number | null;
}

const useIncome = (param: Income) => {
    const queryClient = useQueryClient();
    const incomeList = useQuery({
        queryKey: ['income', param],
        queryFn: () => get(`${API_ENDPOINTS.INCOME.ROOT}?${qs.stringify(param)}`),
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

    const incomeCreate = useMutation({
        mutationFn: (data: Income) => post(`${API_ENDPOINTS.INCOME.ROOT}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['income'] })
    });

    const incomeUpdate = useMutation({
        mutationFn: (data: Income) => patch(`${API_ENDPOINTS.INCOME.ROOT}/${data.id}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['income'] })
    });

    const incomeDelete = useMutation({
        mutationFn: (id: string) => del(`${API_ENDPOINTS.INCOME.ROOT}/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['income'] })
    });

    return {
        list: incomeList.data?.data,
        meta: incomeList.data?.meta,
        isLoading: incomeList.isLoading,
        error: incomeList.error,
        refetch: incomeList.refetch,
        create: incomeCreate,
        update: incomeUpdate,
        delete: incomeDelete,
    }
}

export default useIncome;