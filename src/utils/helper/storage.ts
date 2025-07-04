import Cookies from 'js-cookie';

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes): void => {
  Cookies.set(name, value, options);
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

export const getToken = (): string | undefined => {
  return getCookie('token');
}

export const getRefreshToken = (): string | undefined => {
  return getCookie('refreshToken');
}