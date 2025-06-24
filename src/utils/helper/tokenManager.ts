import { getToken, getRefreshToken, setCookie } from "@/utils/helper/storage";
import { post } from "@/api/config";
import { API_ENDPOINTS, ERROR_MESSAGE_KEYS } from "@/utils/constants/api";
import i18next from "i18next";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

class TokenManager {
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: string | null) => void;
    reject: (error: any) => void;
  }> = [];

  setRefreshing(refreshing: boolean) {
    this.isRefreshing = refreshing;
  }

  getRefreshing() {
    return this.isRefreshing;
  }

  addToQueue(resolve: (value: string | null) => void, reject: (error: any) => void) {
    this.failedQueue.push({ resolve, reject });
  }

  processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    this.failedQueue = [];
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // Call your refresh token endpoint
      const response = await post<TokenResponse>(API_ENDPOINTS.AUTH.REFRESH, {
        refreshToken,
      });

      // Store new tokens
      setCookie("token", response.accessToken, { expires: 7 });
      setCookie("refreshToken", response.refreshToken, { expires: 30 });

      return response.accessToken;
    } catch (error) {
      console.error(i18next.t(ERROR_MESSAGE_KEYS.TOKEN_REFRESH_FAILED), error);
      return null;
    }
  }

  async getValidToken(): Promise<string | null> {
    const token = getToken();
    
    if (!token) {
      return null;
    }

    // You might want to add token expiration check here
    // For now, we'll just return the token
    return token;
  }
}

export const tokenManager = new TokenManager();
export default tokenManager; 