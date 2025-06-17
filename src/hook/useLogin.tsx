import { post } from '@/api/config';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLogin = () => {
    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ username, password }: { username: string, password: string }) =>
            post('/api/login', { email: username, password }),
    });

    return {
        login: mutation.mutate,
        data: mutation.data,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}