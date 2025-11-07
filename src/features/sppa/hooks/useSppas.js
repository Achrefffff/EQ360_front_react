import { useState } from 'react';
import { sppaApi } from '../../../api/sppaApi';
import { useDataStore } from '../../../store/dataStore';

export const useSppas = () => {
  const sppas = useDataStore((state) => state.sppas);
  const refreshSppas = useDataStore((state) => state.refreshSppas);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSppa = async (sppaData) => {
    try {
      await sppaApi.create(sppaData);
      await refreshSppas();
      return { success: true };
    } catch (err) {
      console.error('Erreur création:', err.response?.data || err.message);
      return { success: false, error: err.message };
    }
  };

  const updateSppa = async (id, sppaData) => {
    try {
      await sppaApi.update(id, sppaData);
      await refreshSppas();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteSppa = async (id) => {
    try {
      await sppaApi.delete(id);
      await refreshSppas();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    sppas,
    loading,
    error,
    createSppa,
    updateSppa,
    deleteSppa,
    refreshSppas,
  };
};
