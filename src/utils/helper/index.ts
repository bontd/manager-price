import { ROLE } from '../constants/enum';

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

// Shared function to map number role to enum value
export const roleNumberToEnum = (roleNum: number | undefined | null): ROLE => {
  if (roleNum === undefined || roleNum === null) {
    return ROLE.USER; // Default to USER role
  }
  switch (roleNum) {
    case 99: return ROLE.ADMINISTRATOR;
    case 1: return ROLE.ADMIN;
    case 2: return ROLE.MANAGER;
    case 3: return ROLE.USER;
    default: return ROLE.USER;
  }
};

export const genderStringToEnum = (gender: string | undefined | null): GENDER => {
  if (gender === undefined || gender === null) {
    return GENDER.MALE;
  }
  switch (gender) {
    case 'male': return GENDER.MALE;
    case 'female': return GENDER.FEMALE;
    default: return GENDER.MALE;
  }
};