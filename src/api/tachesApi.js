import apiClient from './apiClient';

export const tachesApi = {
  getAll: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`/taches?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/taches/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/taches', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/taches/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/taches/${id}`);
    return response.data;
  },
};
