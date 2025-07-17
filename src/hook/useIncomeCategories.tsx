import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get, patch, post } from "@/api/config";
import { API_ENDPOINTS } from "@/utils/constants/api";
import qs from "qs";

export interface IncomeCategory {
    id?: string;
    name?: string;
    description?: string;
    current?: string | number | null;
    pageSize?: string | number | null;
    color?: string;
    totalCount?: number | null;
    totalPages?: number | null;
    currentPage?: number | null;
    pageCount?: number | null;
    perPage?: number | null;
}

const useIncomeCategories = (param?: IncomeCategory) => {
    const queryClient = useQueryClient();
    const incomeCategories = useQuery({
        queryKey: ['income-categories', param],
        queryFn: () => get(`${API_ENDPOINTS.INCOME_CATEGORIES.ROOT}?${qs.stringify(param)}`),
        select: (res: any) => {
            return {
                data: res?.records.data || [],
                meta: {
                    currentPage: Number(res?.headers['x-current-page']),
                    pageCount: Number(res?.headers['x-page-count']),
                    perPage: Number(res?.headers['x-per-page']),
                    totalPages: Number(res?.headers['x-total-pages']),
                    totalCount: Number(res?.headers['x-total-count']),
                }
            }
        }
    });

    const incomeCategoryCreate = useMutation({
        mutationFn: (data: IncomeCategory) => post(API_ENDPOINTS.INCOME_CATEGORIES.ROOT, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['income-categories'] });
        }
    });

    const incomeCategoryUpdate = useMutation({
        mutationFn: (data: IncomeCategory) => patch(`${API_ENDPOINTS.INCOME_CATEGORIES.ROOT}/${data.id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['income-categories'] });
        }
    });

    const incomeCategoryDelete = useMutation({
        mutationFn: (id: string) => del(`${API_ENDPOINTS.INCOME_CATEGORIES.ROOT}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['income-categories'] });
        }
    });
    return {
        list: incomeCategories.data?.data || [],
        meta: incomeCategories.data?.meta || {},
        isLoading: incomeCategories.isLoading,
        isError: incomeCategories.isError,
        error: incomeCategories.error,
        incomeCategoryCreate,
        incomeCategoryUpdate,
        incomeCategoryDelete,
    }
}

export default useIncomeCategories;