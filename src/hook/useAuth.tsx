import { post } from "@/api/config";
import { API_ENDPOINTS } from "@/utils/constants/api";
import { useMutation } from "@tanstack/react-query";

const useAuth = () => {
    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ username, password }: { username: string, password: string }) =>
            post(API_ENDPOINTS.AUTH.LOGIN, { email: username, password }),
    });

    const resetPassword = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: (data: any) => post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data),
    });

    const verifyResetPassword = useMutation({
        mutationKey: ['verify-reset-password'],
        mutationFn: (data: any) => post(API_ENDPOINTS.AUTH.VERIFY_RESET_PASSWORD, data),
    });

    return {
        login: mutation.mutate,
        data: mutation.data,
        isLoading: mutation.isPending,
        error: mutation.error,
        resetPassword: resetPassword.mutate,
        dataResetPassword: resetPassword.data,
        isLoadingResetPassword: resetPassword.isPending,
        errorResetPassword: resetPassword.error,
        verifyResetPassword: verifyResetPassword.mutate,
        dataVerifyResetPassword: verifyResetPassword.data,
        isLoadingVerifyResetPassword: verifyResetPassword.isPending,
        errorVerifyResetPassword: verifyResetPassword.error,
    }
}

export default useAuth;