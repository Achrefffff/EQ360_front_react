import { useState, useEffect } from "react";
import { tachesApi } from "../../../api/tachesApi";
import { projetsApi } from "../../../api/projetsApi";
import { sppaApi } from "../../../api/sppaApi";
import { objectifsApi } from "../../../api/objectifsApi";

export const useDashboardData = () => {
  const [taches, setTaches] = useState([]);
  const [projets, setProjets] = useState([]);
  const [sppas, setSppas] = useState([]);
  const [objectifs, setObjectifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [tachesData, projetsData, sppaData, objectifsData] = await Promise.all([
          tachesApi.getAll(),
          projetsApi.getAll(),
          sppaApi.getAll(),
          objectifsApi.getAll(),
        ]);

        setTaches(tachesData.items || []);
        setProjets(projetsData.items || []);
        setSppas(sppaData.items || []);
        setObjectifs(objectifsData.items || []);
      } catch (err) {
        setError(err.message);
        console.error("Erreur lors du chargement des données:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculer les statistiques
  const stats = {
    taches: {
      total: taches.length,
      actives: taches.filter((t) => t.statut !== "done").length,
      terminees: taches.filter((t) => t.statut === "done").length,
    },
    projets: {
      total: projets.length,
      enCours: projets.filter((p) => p.statut === "en_cours").length,
      termines: projets.filter((p) => p.statut === "termine").length,
    },
    objectifs: {
      total: 0,
      enCours: 0,
      atteints: 0,
    },
    sppas: {
      total: sppas.length,
      niveauMoyen:
        sppas.length > 0
          ? Math.round(
              sppas.reduce((sum, s) => sum + (s.niveau || 0), 0) / sppas.length
            )
          : 0,
    },
  };

  // Calculer les statistiques des objectifs
  stats.objectifs = {
    total: objectifs.length,
    enCours: objectifs.filter((o) => o.statut === "en_cours").length,
    atteints: objectifs.filter((o) => o.statut === "atteint").length,
  };

  return {
    taches,
    projets,
    sppas,
    objectifs,
    stats,
    loading,
    error,
  };
};
