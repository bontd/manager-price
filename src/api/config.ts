import configs from "@/utils/constants/config";
import { getRefreshToken, getToken } from "@/utils/helper/storage";
import axios, { AxiosHeaders, AxiosRequestHeaders, AxiosResponse } from "axios";
import { toast } from "react-toastify";
interface RequestConfig {
  headers?: AxiosRequestHeaders;
  params?: Record<string, any>;
}

export interface ErrorResponse {
  status: number;
  data: { code: number; errorCode: string; message: string };
}

const axiosInstance = axios.create({
  baseURL: configs.API_DOMAIN,
  timeout: 12000000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token); 
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;
    if (!error.response) {
      toast.error("No network connection. Please try again!");
      return Promise.reject(
        new Error("No network connection. Please try again!")
      );
    }
    const { status, message } = error.response.data;
    const refreshToken = getRefreshToken();
    const token = getToken();
    console.log(token);
    
    if (!token && !isRefreshing) {
      isRefreshing = true;
      window.location.href = '/login';
      return Promise.reject(
        new Error("Unauthorized access. Please log in again.")
      );
    }

    if (status === 401) {
      toast.error(message);
      return Promise.reject(error);
    }
    if (originalRequest._retry) {
      toast.error('please login again');
      return Promise.reject(error);
    }
    originalRequest._retry = true;
    
    if (!refreshToken) {
      toast.error('Unauthorized access. Please log in again.');
      return Promise.reject(
        new Error("Unauthorized access. Please log in again.")
      );
    }

    // if (isRefreshing) {
    //   return new Promise((resolve, reject) => {
    //     failedQueue.push({
    //       resolve: (token: string) => {
    //         originalRequest.headers.Authorization = `Bearer ${token}`;
    //         resolve(axiosInstance(originalRequest));
    //       },
    //       reject: (err: any) => reject(err),
    //     });
    //   });
    // }
    // isRefreshing = true;
    // try {
    //   const response = await apiManagement.refreshToken({
    //     AccessToken: token,
    //     RefreshToken: refreshToken,
    //   });
    //   const newAccessToken = response?.accessToken;
    //   if (newAccessToken) {
    //     setToken(newAccessToken, {
    //       maxAge: 31556952000,
    //     });
    //   }
    //   processQueue(null, newAccessToken);
    //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //   return axiosInstance(originalRequest);
    // } catch (err) {
    //   processQueue(err, null);
    //   useLogout();
    //   return Promise.reject(new Error("Session expired. Please log in again."));
    // } finally {
    //   isRefreshing = false;
    // }
  }
);

export default axiosInstance;

export const createConfig = (
  headers?: AxiosRequestHeaders,
  params?: Record<string, any>
): RequestConfig => {
  const axiosHeaders = new AxiosHeaders({
    "Content-Type": "application/json",
    ...headers,
  });

  return {
    headers: axiosHeaders,
    params,
  };
};

interface IAPIGet<T> {
  records: T;
  totalItems: number;
}

export const get = async <T>(
  endpoint: string,
  params?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<IAPIGet<T>> => {
  const config = createConfig(headers, params);
  const response: AxiosResponse<T> = await axiosInstance.get(endpoint, config);
  const totalItems = response?.headers?.["totalrecords"]
    ? +response?.headers?.["totalrecords"]
    : 0;

  return { records: response.data, totalItems: totalItems };
};

export const post = async <T>(
  endpoint: string,
  data?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  const config = createConfig(headers);
  const response: AxiosResponse<T> = await axiosInstance.post(
    endpoint,
    data,
    config
  );
  return response.data;
};

export const put = async <T>(
  endpoint: string,
  data?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  const config = createConfig(headers);
  const response: AxiosResponse<T> = await axiosInstance.put(
    endpoint,
    data,
    config
  );
  return response.data;
};

export const del = async <T>(
  endpoint: string,
  data?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  const config = createConfig(headers);
  const response: AxiosResponse<T> = await axiosInstance.delete(endpoint, {
    data,
    ...config,
  });
  return response.data;
};
