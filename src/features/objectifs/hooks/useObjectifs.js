import { useState } from "react";
import { objectifsApi } from "../../../api/objectifsApi";
import { useDataStore } from "../../../store/dataStore";

export const useObjectifs = () => {
  const objectifs = useDataStore((state) => state.objectifs);
  const refreshObjectifs = useDataStore((state) => state.refreshObjectifs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createObjectif = async (objectifData) => {
    try {
      await objectifsApi.create(objectifData);
      await refreshObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateObjectif = async (id, objectifData) => {
    try {
      await objectifsApi.update(id, objectifData);
      await refreshObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteObjectif = async (id) => {
    try {
      await objectifsApi.delete(id);
      await refreshObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    objectifs,
    loading,
    error,
    fetchObjectifs: refreshObjectifs,
    createObjectif,
    updateObjectif,
    deleteObjectif,
  };
};
