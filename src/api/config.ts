import configs from "@/utils/constants/config";
import { CULTURE } from "@/utils/constants/enum";
import storage from "@/utils/helper/storage";
import axios, { AxiosHeaders, AxiosRequestHeaders, AxiosResponse } from "axios";
import { languageType } from "./request";

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
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-interface-type": "app",
  },
});

// get languages
const getCulture = (lng: languageType): string => CULTURE[lng] || CULTURE.en;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    const lng = storage.getLocale();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (lng) {
      config.params = {
        ...config.params,
        culture: getCulture(lng as languageType),
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(
        new Error("No network connection. Please try again!")
      );
    }
    const { status, data } = error.response;
    if (status !== 401) {
      return Promise.reject(data);
    }
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) {
      return Promise.reject(
        new Error("Unauthorized access. Please log in again.")
      );
    }
    return Promise.reject(error);
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
  data: T;
  totalItems: number;
}

export const get = async <T>(
  endpoint: string,
  params?: Record<string, any>,
  headers?: AxiosRequestHeaders
): Promise<IAPIGet<T>> => {
  const config = createConfig(headers, params);
  const response: AxiosResponse<T> = await axiosInstance.get(endpoint, config);
  const totalItems = Number(response.headers["Totalrecords"]) || 0;
  return { data: response.data, totalItems: totalItems };
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
