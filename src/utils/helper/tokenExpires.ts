/**
 * Utility functions for calculating token expiration times
 */

interface TokenExpiresConfig {
  expiresIn?: number;
  refreshExpiresIn?: number;
  defaultExpiresIn?: number;
  defaultRefreshExpiresIn?: number;
}

interface TokenExpiresResult {
  expires: number;
  refreshExpires: number;
}

/**
 * Calculate token expiration times from API response
 * @param config - Configuration object containing expires_in values
 * @returns Object with calculated expires values in days
 */
export const calculateTokenExpires = (config: TokenExpiresConfig): TokenExpiresResult => {
  const {
    expiresIn,
    refreshExpiresIn,
    defaultExpiresIn = 86400, // 1 day in seconds
    defaultRefreshExpiresIn = 172800 // 2 days in seconds
  } = config;

  // Lấy expires_in và refresh_expires_in từ response (giây)
  const accessExpiresIn = expiresIn || defaultExpiresIn;
  const refreshExpiresInSeconds = refreshExpiresIn || defaultRefreshExpiresIn;
  // Chuyển sang ngày (làm tròn lên 1 số thập phân)
  const expires = (accessExpiresIn / 86400 * 10) / 10;
  const refreshExpires = (refreshExpiresInSeconds / 86400 * 10) / 10;
  return { expires, refreshExpires };
};

/**
 * Calculate token expiration times from API response data
 * @param data - API response data containing expires_in fields
 * @returns Object with calculated expires values in days
 */
export const calculateTokenExpiresFromResponse = (data: any): TokenExpiresResult => {
  const { expires_in, refresh_expires_in } = data;
  
  return calculateTokenExpires({
    expiresIn: expires_in,
    refreshExpiresIn: refresh_expires_in
  });
}; 