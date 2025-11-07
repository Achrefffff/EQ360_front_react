import { useState, useEffect } from "react";
import { objectifsApi } from "../../../api/objectifsApi";

export const useObjectifs = () => {
  const [objectifs, setObjectifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchObjectifs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await objectifsApi.getAll();
      setObjectifs(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createObjectif = async (objectifData) => {
    try {
      await objectifsApi.create(objectifData);
      await fetchObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateObjectif = async (id, objectifData) => {
    try {
      await objectifsApi.update(id, objectifData);
      await fetchObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteObjectif = async (id) => {
    try {
      await objectifsApi.delete(id);
      await fetchObjectifs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchObjectifs();
  }, []);

  return {
    objectifs,
    loading,
    error,
    fetchObjectifs,
    createObjectif,
    updateObjectif,
    deleteObjectif,
  };
};
