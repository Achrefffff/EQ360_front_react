import { useState, useEffect } from 'react';
import { tachesApi } from '../../../api/tachesApi';

export const useTaches = () => {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTaches = async () => {
    try {
      setLoading(true);
      const data = await tachesApi.getAll();
      const tachesArray = data.items || data.data || data || [];
      setTaches(Array.isArray(tachesArray) ? tachesArray : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTaches([]);
      console.error('Erreur lors du chargement des tâches:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTache = async (tacheData) => {
    try {
      const formattedData = {
        ...tacheData,
        dureeEstimee: parseFloat(tacheData.dureeEstimee),
        difficulte: parseInt(tacheData.difficulte),
        enthousiasme: parseInt(tacheData.enthousiasme),
        sppaId: tacheData.sppaId ? parseInt(tacheData.sppaId) : null,
        projetId: tacheData.projetId ? parseInt(tacheData.projetId) : null,
      };
      console.log('Données envoyées:', formattedData);
      await tachesApi.create(formattedData);
      await fetchTaches();
      return { success: true };
    } catch (err) {
      console.error('Erreur création:', err.response?.data || err.message);
      return { success: false, error: err.message };
    }
  };

  const updateTache = async (id, tacheData) => {
    try {
      const formattedData = {
        ...tacheData,
        dureeEstimee: parseFloat(tacheData.dureeEstimee),
        difficulte: parseInt(tacheData.difficulte),
        enthousiasme: parseInt(tacheData.enthousiasme),
        sppaId: tacheData.sppaId ? parseInt(tacheData.sppaId) : null,
        projetId: tacheData.projetId ? parseInt(tacheData.projetId) : null,
      };
      await tachesApi.update(id, formattedData);
      await fetchTaches();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteTache = async (id) => {
    try {
      await tachesApi.delete(id);
      await fetchTaches();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchTaches();
  }, []);

  return {
    taches,
    loading,
    error,
    createTache,
    updateTache,
    deleteTache,
    refreshTaches: fetchTaches,
  };
};
