// SessionManager.js

const SESSION_KEY = 'user_session';

export const setSession = (data) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

export const getSession = () => {
  const sessionData = localStorage.getItem(SESSION_KEY);
  return sessionData ? JSON.parse(sessionData) : null;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
