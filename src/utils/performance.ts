// Performance utilities to suppress console warnings
export const suppressPerformanceWarnings = () => {
  // Suppress 'loadend' handler warnings
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('loadend')) {
      return; // Suppress loadend warnings
    }
    if (args[0] && typeof args[0] === 'string' && args[0].includes('message')) {
      return; // Suppress message handler warnings
    }
    originalConsoleWarn.apply(console, args);
  };

  // Suppress violation warnings in development
  if (process.env.NODE_ENV === 'development') {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('[Violation]')) {
        return; // Suppress violation warnings
      }
      originalConsoleError.apply(console, args);
    };
  }
};

// Call this function early in your app initialization
suppressPerformanceWarnings(); 