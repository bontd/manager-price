import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get, post, put } from "@/api/config";
import { API_ENDPOINTS } from "@/utils/constants/api";
import qs from "qs";

const useNews = (param?: any, id?: string) => {
    const queryClient = useQueryClient();
    const listQuery = useQuery({
        queryKey: ['news', param],
        queryFn: () => get(`${API_ENDPOINTS.NEWS.ROOT}?${qs.stringify(param)}`),
        enabled: !!param?.current && !!param?.pageSize && !param?.isClient,
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

    const listClientQuery = useQuery({
        queryKey: ['news-client', param],
        queryFn: () => get(`${API_ENDPOINTS.NEWS.CLIENT}?${qs.stringify(param)}`),
        enabled: !!param?.current && !!param?.pageSize && param?.isClient,
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

    const getNews = useQuery({
        queryKey: ['news', id],
        queryFn: () => get(`${API_ENDPOINTS.NEWS.ROOT}/${id}`),
        enabled: !!id,
        select: (res: any) => {
            return res?.records?.data;
        },
    });

    const getNewsClient = useQuery({
        queryKey: ['news-client', id],
        queryFn: () => get(`${API_ENDPOINTS.NEWS.CLIENT}/detail/${id}`),
        enabled: !!id,
        select: (res: any) => {
            return res?.records?.data;
        },
    });

    const createNews = useMutation({
        mutationFn: (data: any) => post(`${API_ENDPOINTS.NEWS.ROOT}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            queryClient.refetchQueries({ queryKey: ['news'] });
        },
    });

    const updateNews = useMutation({
        mutationFn: (data: any) => put(`${API_ENDPOINTS.NEWS.ROOT}/${data.id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            queryClient.refetchQueries({ queryKey: ['news'] });
        },
    });

    const deleteNews = useMutation({
        mutationFn: (id: string) => del(`${API_ENDPOINTS.NEWS.ROOT}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            queryClient.refetchQueries({ queryKey: ['news'] });
        },
    });

    return {
        data: listQuery.data?.data,
        meta: listQuery.data?.meta,
        isLoading: listQuery.isLoading,
        isFetching: listQuery.isFetching,
        dataClient: listClientQuery.data?.data,
        metaClient: listClientQuery.data?.meta,
        isLoadingClient: listClientQuery.isLoading,
        isFetchingClient: listClientQuery.isFetching,
        getDetailNews: getNewsClient.data,
        isGettingDetailNews: getNewsClient.isPending,
        createNews: createNews,
        isCreating: createNews.isPending,
        getNews: getNews,
        isGettingNews: getNews.isPending,
        updateNews: updateNews,
        isUpdating: updateNews.isPending,
        deleteNews: deleteNews,
        isDeleting: deleteNews.isPending,
    }
}

export default useNews;