import { localStorageLoginKey } from "../Constants/login";

export const saveTokenInLocalStorage = (token: string) => {
  localStorage.setItem(localStorageLoginKey, token);
};

export const getTokenFromLocalStorage = (): string => {
  return localStorage.getItem(localStorageLoginKey) || "";
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(localStorageLoginKey);
};
