import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import './i18n';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';

import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import './utils/performance';

const queryClient = new QueryClient();

// Configure Antd for React 19 compatibility
const antdConfig = {
  theme: {
    token: {
      // Add any custom theme tokens here
    },
  },
  componentSize: 'middle' as const,
  space: {
    size: 'middle' as const,
  },
};

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container not found");
}

createRoot(container).render(
  <StrictMode>
    <ConfigProvider {...antdConfig}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          pauseOnHover={false} 
          pauseOnFocusLoss={false} 
          className="custom-toast-container"
        />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
