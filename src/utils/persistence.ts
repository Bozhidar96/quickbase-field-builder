/**
 * Utility functions for interacting with the browser's localStorage API..
 * 
 * Note: localStorage is synchronous and limited in size (~5MB). 
 * It is not recommended for storing sensitive data.
 */
export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
