// Export all helpers
export * from './storage';
export { default as tokenManager } from './tokenManager';
export * from './tokenExpires';

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}; 