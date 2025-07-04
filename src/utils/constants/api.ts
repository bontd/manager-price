// API Configuration Constants
export const API_CONSTANTS = {
  TIMEOUT: 120000, // 2 minutes
  MAX_RETRIES: 1,
  RETRY_DELAY: 1000, // 1 second
  HEADERS: {
    CONTENT_TYPE: "application/json",
    AUTHORIZATION: "Bearer",
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Message Keys for i18n
export const ERROR_MESSAGE_KEYS = {
  NETWORK_ERROR: "axios.error.tokenExpired",
  UNAUTHORIZED: "axios.error.unauthorized",
  GENERIC_ERROR: "axios.error.server",
  SERVER_ERROR: "axios.error.server",
  TOKEN_REFRESH_FAILED: "axios.error.pleaseLoginAgain",
  TIMEOUT: "axios.error.timeout",
  NOT_FOUND: "axios.error.notFound",
  SESSION_EXPIRED: "axios.error.sessionExpired",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/login",
    LOGOUT: "/api/logout",
    REFRESH: "/api/refresh",
    REGISTER: "/api/register",
    RESET_PASSWORD: "/api/passwordReset",
    VERIFY_RESET_PASSWORD: "/api/passwordReset/verify",
  },
  USER: {
    PROFILE: "/api/user/profile",
    UPDATE: "/api/user/update",
  },
  EXPENSE_CATEGORIES: {
    ROOT: "/api/expense-categories",
    DETAIL: (id: string | number) => `/api/expense-categories/${id}`,
  },
  EXPENSES: {
    ROOT: "/api/expenses",
    DETAIL: (id: string | number) => `/api/expenses/${id}`,
    STATISTICS: (period: string = 'month') => `/api/expenses/statistics?period=${period}`,
  },
} as const; 