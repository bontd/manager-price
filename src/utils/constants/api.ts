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
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH: "/refresh",
    REGISTER: "/register",
    RESET_PASSWORD: "/passwordReset",
    VERIFY_RESET_PASSWORD: "/passwordReset/verify",
  },
  USER: {
    ROOT: "/users",
    PROFILE: "/user/profile",
    STATUS: (id: string | number) => `/users/${id}/status`,
  },
  EXPENSE_CATEGORIES: {
    ROOT: "/expense-categories"
  },
  EXPENSES: {
    ROOT: "/expenses",
    DETAIL: (id: string | number) => `/expenses/${id}`,
    STATISTICS: (filters: any = {}) => {
      const params = new URLSearchParams();
      
      // Add period (default to month)
      params.append('period', filters.period || 'month');
      
      // Add custom date filters
      if (filters.start_date) params.append('start_date', filters.start_date);
      if (filters.end_date) params.append('end_date', filters.end_date);
      
      // Add additional filters
      if (filters.category) params.append('category', filters.category);
      if (filters.payment_method) params.append('payment_method', filters.payment_method);
      if (filters.min_amount) params.append('min_amount', filters.min_amount.toString());
      if (filters.max_amount) params.append('max_amount', filters.max_amount.toString());
      
      return `/expenses/statistics?${params.toString()}`;
    }
  },
  INCOME: {
    ROOT: "/incomes",
  },
  INCOME_CATEGORIES: {
    ROOT: "/income-categories"
  },
  NEWS: {
    ROOT: "/news",
    CLIENT: "/new",
  },
  NEWS_CATEGORIES: {
    ROOT: "/news-categories",
    CLIENT: "/new-categories"
  }
} as const; 