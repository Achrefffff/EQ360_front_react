import apiClient from './apiClient';

export const projetsApi = {
  getAll: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`/projets?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/projets/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/projets', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/projets/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/projets/${id}`);
    return response.data;
  },
};
