import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get, post, put } from "@/api/config";
import { API_ENDPOINTS } from "@/utils/constants/api";
import qs from "qs";
import { NewsCategory } from "@/types/news";

const useNewsCategories = (param?: NewsCategory) => {
    const queryClient = useQueryClient();
    const listQuery = useQuery({
        queryKey: ['news-categories', param],
        queryFn: () => get(`${API_ENDPOINTS.NEWS_CATEGORIES.ROOT}?${qs.stringify(param)}`),
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

    const createQuery = useMutation({
        mutationFn: (data: any) => post(`${API_ENDPOINTS.NEWS_CATEGORIES.ROOT}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news-categories'] });
        }
    });

    const updateQuery = useMutation({
        mutationFn: (data: any) => put(`${API_ENDPOINTS.NEWS_CATEGORIES.ROOT}/${data.id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news-categories'] });
        }
    });

    const deleteQuery = useMutation({
        mutationFn: (id: string) => del(`${API_ENDPOINTS.NEWS_CATEGORIES.ROOT}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news-categories'] });
        }
    });

    return {
        data: listQuery.data?.data,
        meta: listQuery.data?.meta,
        isLoading: listQuery.isLoading,
        isFetching: listQuery.isFetching,
        isError: listQuery.isError,
        createQuery,
        createLoading: createQuery.isPending,
        updateQuery,
        deleteQuery,
        isDeleting: deleteQuery.isPending
    }
}

export default useNewsCategories;