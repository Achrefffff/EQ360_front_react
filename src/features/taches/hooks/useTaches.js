import { useState } from 'react';
import { tachesApi } from '../../../api/tachesApi';
import { useDataStore } from '../../../store/dataStore';

export const useTaches = () => {
  const taches = useDataStore((state) => state.taches);
  const refreshTaches = useDataStore((state) => state.refreshTaches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      await refreshTaches();
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
      await refreshTaches();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteTache = async (id) => {
    try {
      await tachesApi.delete(id);
      await refreshTaches();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    taches,
    loading,
    error,
    createTache,
    updateTache,
    deleteTache,
    refreshTaches,
  };
};
