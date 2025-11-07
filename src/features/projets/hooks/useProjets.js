import { useState, useEffect } from "react";
import { projetsApi } from "../../../api/projetsApi";

export const useProjets = () => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projetsApi.getAll();
      setProjets(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProjet = async (projetData) => {
    try {
      await projetsApi.create(projetData);
      await fetchProjets();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProjet = async (id, projetData) => {
    try {
      await projetsApi.update(id, projetData);
      await fetchProjets();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProjet = async (id) => {
    try {
      await projetsApi.delete(id);
      await fetchProjets();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProjets();
  }, []);

  return {
    projets,
    loading,
    error,
    fetchProjets,
    createProjet,
    updateProjet,
    deleteProjet,
  };
};
