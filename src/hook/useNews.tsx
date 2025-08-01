import { useQuery } from "@tanstack/react-query";
import { get } from "@/api/config";
import { API_ENDPOINTS } from "@/utils/constants/api";
import qs from "qs";

const useNews = (param?: any) => {
    const listQuery = useQuery({
        queryKey: ['news', param],
        queryFn: () => get(`${API_ENDPOINTS.NEWS.ROOT}?${qs.stringify(param)}`),
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

    return {
        data: listQuery.data?.data,
        meta: listQuery.data?.meta,
        isLoading: listQuery.isLoading,
    }
}

export default useNews;