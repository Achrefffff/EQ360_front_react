import apiClient from './apiClient';

export const sppaApi = {
  getAll: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`/sppas?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/sppas/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/sppas', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/sppas/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/sppas/${id}`);
    return response.data;
  },
};
