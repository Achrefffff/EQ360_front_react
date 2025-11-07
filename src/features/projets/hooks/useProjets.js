import { useState } from "react";
import { projetsApi } from "../../../api/projetsApi";
import { useDataStore } from "../../../store/dataStore";

export const useProjets = () => {
  const projets = useDataStore((state) => state.projets);
  const refreshProjets = useDataStore((state) => state.refreshProjets);
  const refreshSppas = useDataStore((state) => state.refreshSppas);
  const refreshObjectifs = useDataStore((state) => state.refreshObjectifs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProjet = async (projetData) => {
    try {
      await projetsApi.create(projetData);
      await refreshProjets();
      if (projetData.sppaId) await refreshSppas();
      if (projetData.objectifId) await refreshObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProjet = async (id, projetData) => {
    try {
      await projetsApi.update(id, projetData);
      await refreshProjets();
      if (projetData.sppaId) await refreshSppas();
      if (projetData.objectifId) await refreshObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProjet = async (id) => {
    try {
      await projetsApi.delete(id);
      await refreshProjets();
      await refreshSppas();
      await refreshObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    projets,
    loading,
    error,
    fetchProjets: refreshProjets,
    createProjet,
    updateProjet,
    deleteProjet,
  };
};
