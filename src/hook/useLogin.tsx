import { post } from '@/api/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/constants/api';

export const useLogin = () => {
    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ username, password }: { username: string, password: string }) =>
            post(API_ENDPOINTS.AUTH.LOGIN, { email: username, password }),
    });

    return {
        login: mutation.mutate,
        data: mutation.data,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}