import apiClient from './apiClient';

export const objectifsApi = {
  getAll: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`/objectifs?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/objectifs/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/objectifs', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/objectifs/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/objectifs/${id}`);
    return response.data;
  },
};
