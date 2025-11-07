import { useDataStore } from "../../../store/dataStore";

export const useDashboardData = () => {
  const taches = useDataStore((state) => state.taches);
  const projets = useDataStore((state) => state.projets);
  const sppas = useDataStore((state) => state.sppas);
  const objectifs = useDataStore((state) => state.objectifs);
  const loading = false;
  const error = null;

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
