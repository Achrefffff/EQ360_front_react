import apiClient from './apiClient';

export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/register', userData);
    return response.data;
  },
};
