import { create } from 'zustand';

const getToken = () => localStorage.getItem('token');

export const useAuthStore = create((set) => ({
  token: getToken(),
  isAuthenticated: !!getToken(),

  login: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false });
  },
}));
