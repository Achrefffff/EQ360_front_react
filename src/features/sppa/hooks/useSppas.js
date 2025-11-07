import { useState, useEffect } from 'react';
import { sppaApi } from '../../../api/sppaApi';

export const useSppas = () => {
  const [sppas, setSppas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSppas = async () => {
    try {
      setLoading(true);
      const data = await sppaApi.getAll();
      const sppasArray = data.items || data.data || data || [];
      setSppas(Array.isArray(sppasArray) ? sppasArray : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSppas([]);
      console.error('Erreur lors du chargement des SPPA:', err);
    } finally {
      setLoading(false);
    }
  };

  const createSppa = async (sppaData) => {
    try {
      await sppaApi.create(sppaData);
      await fetchSppas();
      return { success: true };
    } catch (err) {
      console.error('Erreur création:', err.response?.data || err.message);
      return { success: false, error: err.message };
    }
  };

  const updateSppa = async (id, sppaData) => {
    try {
      await sppaApi.update(id, sppaData);
      await fetchSppas();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteSppa = async (id) => {
    try {
      await sppaApi.delete(id);
      await fetchSppas();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchSppas();
  }, []);

  return {
    sppas,
    loading,
    error,
    createSppa,
    updateSppa,
    deleteSppa,
    refreshSppas: fetchSppas,
  };
};
