import configs from "@/utils/constants/config";
import { getToken } from "@/utils/helper/storage";
import axios, { AxiosHeaders, AxiosRequestHeaders, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { tokenManager } from "@/utils/helper/tokenManager";
import { API_CONSTANTS, HTTP_STATUS, ERROR_MESSAGE_KEYS } from "@/utils/constants/api";
import i18next from "i18next";

// Types
interface RequestConfig {
  headers?: AxiosRequestHeaders;
  params?: Record<string, any>;
}

export interface ErrorResponse {
  status: number;
  data: { code: number; errorCode: string; message: string };
}

interface IAPIGet<T> {
  records: T;
  totalItems: number;
}

// Toast management to prevent duplicate error messages
class ToastManager {
  private lastErrorTime: { [key: string]: number } = {};
  private readonly DEBOUNCE_TIME = 3000; // 3 seconds

  showError(message: string, errorType: string = 'default') {
    const now = Date.now();
    const key = `${errorType}:${message}`;
    
    if (!this.lastErrorTime[key] || (now - this.lastErrorTime[key]) > this.DEBOUNCE_TIME) {
      this.lastErrorTime[key] = now;
      toast.error(message);
    }
  }
}

const toastManager = new ToastManager();

// Create axios instance
const axiosInstance = axios.create({
  baseURL: configs.API_DOMAIN,
  timeout: API_CONSTANTS.TIMEOUT,
  headers: {
    "Content-Type": API_CONSTANTS.HEADERS.CONTENT_TYPE,
  },
});

// Error handling utilities - không hiển thị toast ở đây nữa
const handleNetworkError = () => {
  return Promise.reject(new Error("No network connection"));
};

const handleUnauthorizedError = (message?: string) => {
  toastManager.showError(message || i18next.t(ERROR_MESSAGE_KEYS.UNAUTHORIZED), 'unauthorized');
  window.location.href = '/login';
  return Promise.reject(new Error("Unauthorized access"));
};

const handleGenericError = (message?: string) => {
  return Promise.reject(new Error(message || "Generic error"));
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      config.headers.Authorization = `${API_CONSTANTS.HEADERS.AUTHORIZATION} ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with improved error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle network errors - không hiển thị toast ở đây
    if (!error.response) {
      return handleNetworkError();
    }

    const { status, data } = error.response;
    const errorMessage = (data as any)?.message;

    // Handle 401 Unauthorized
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      const token = getToken();
      
      if (!token) {
        return handleUnauthorizedError();
      }

      // Try to refresh token if not already refreshing
      if (!tokenManager.getRefreshing()) {
        tokenManager.setRefreshing(true);
        
        try {
          const newToken = await tokenManager.refreshToken();
          tokenManager.setRefreshing(false);
          
          if (newToken) {
            tokenManager.processQueue(null, newToken);
            // Retry the original request with new token
            if (originalRequest) {
              originalRequest.headers.Authorization = `${API_CONSTANTS.HEADERS.AUTHORIZATION} ${newToken}`;
              return axiosInstance(originalRequest);
            }
          } else {
            tokenManager.processQueue(new Error("Token refresh failed"));
            return handleUnauthorizedError();
          }
        } catch (refreshError) {
          tokenManager.setRefreshing(false);
          tokenManager.processQueue(refreshError);
          return handleUnauthorizedError();
        }
      } else {
        // If already refreshing, add to queue
        return new Promise((resolve, reject) => {
          tokenManager.addToQueue(resolve, reject);
        }).then(() => {
          return axiosInstance(originalRequest!);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }
    }

    // Handle other HTTP errors - không hiển thị toast ở đây
    if (status >= 400 && status < 500) {
      return handleGenericError(errorMessage);
    }

    if (status >= 500) {
      return handleGenericError(i18next.t(ERROR_MESSAGE_KEYS.SERVER_ERROR));
    }

    return Promise.reject(error);
  }
);

// Retry mechanism for failed requests
const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries: number = API_CONSTANTS.MAX_RETRIES
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries > 0 && !(error as AxiosError).response) {
      // Chỉ retry cho network errors, không hiển thị toast
      await new Promise(resolve => setTimeout(resolve, API_CONSTANTS.RETRY_DELAY));
      return retryRequest(requestFn, retries - 1);
    }
    
    // Chỉ hiển thị toast khi tất cả retry đều thất bại
    if (!(error as AxiosError).response) {
      toastManager.showError(i18next.t(ERROR_MESSAGE_KEYS.NETWORK_ERROR), 'network');
    } else {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const errorMessage = (axiosError.response?.data as any)?.message;
      
      if (status && status >= 400 && status < 500) {
        toastManager.showError(errorMessage || i18next.t(ERROR_MESSAGE_KEYS.GENERIC_ERROR), 'client');
      } else if (status && status >= 500) {
        toastManager.showError(i18next.t(ERROR_MESSAGE_KEYS.SERVER_ERROR), 'server');
      }
    }
    
    throw error;
  }
};

// Utility function to create request config
export const createConfig = (
  headers?: AxiosRequestHeaders,
  params?: Record<string, any>
): RequestConfig => {
  const axiosHeaders = new AxiosHeaders({
    "Content-Type": API_CONSTANTS.HEADERS.CONTENT_TYPE,
    ...headers,
  });

  return {
    headers: axiosHeaders,
    params,
  };
};

// API methods with retry mechanism
export const get = async <T>(
  endpoint: string,
  params?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<IAPIGet<T>> => {
  return retryRequest(async () => {
    const config = createConfig(headers, params);
    const response: AxiosResponse<T> = await axiosInstance.get(endpoint, config);
    
    const totalItems = response?.headers?.["totalrecords"]
      ? +response.headers["totalrecords"]
      : 0;

    return { records: response.data, totalItems };
  });
};

export const post = async <T>(
  endpoint: string,
  data?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  return retryRequest(async () => {
    const config = createConfig(headers);
    const response: AxiosResponse<T> = await axiosInstance.post(
      endpoint,
      data,
      config
    );
    return response.data;
  });
};

export const put = async <T>(
  endpoint: string,
  data?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  return retryRequest(async () => {
    const config = createConfig(headers);
    const response: AxiosResponse<T> = await axiosInstance.put(
      endpoint,
      data,
      config
    );
    return response.data;
  });
};

export const del = async <T>(
  endpoint: string,
  data?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  return retryRequest(async () => {
    const config = createConfig(headers);
    const response: AxiosResponse<T> = await axiosInstance.delete(endpoint, {
      data,
      ...config,
    });
    return response.data;
  });
};

// Export axios instance for direct use if needed
export default axiosInstance;
