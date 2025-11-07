import { useMemo } from "react";
import { useDataStore } from "../../../store/dataStore";

export const useChartData = () => {
  const sppas = useDataStore((state) => state.sppas);
  const objectifs = useDataStore((state) => state.objectifs);

  // LineChart - Évolution XP par SPPA
  const xpEvolutionData = useMemo(() => {
    return sppas.map((sppa) => ({
      name: sppa.nom,
      xp: sppa.experienceXp || 0,
      niveau: sppa.niveau || 1,
    }));
  }, [sppas]);

  // AreaChart - Progression des objectifs
  const objectifsProgressionData = useMemo(() => {
    return objectifs.map((objectif) => ({
      name: objectif.titre.length > 20 
        ? objectif.titre.substring(0, 20) + "..." 
        : objectif.titre,
      progression: objectif.progression || 0,
    }));
  }, [objectifs]);

  // RadarChart - Compétences par SPPA
  const competencesRadarData = useMemo(() => {
    return sppas.map((sppa) => {
      const competences = sppa.competences || [];
      return {
        sppa: sppa.nom,
        competences: competences.length,
        niveau: sppa.niveau || 1,
        heures: Math.min(sppa.heuresAccumulees || 0, 100), // Normaliser à 100 max
      };
    });
  }, [sppas]);

  return {
    xpEvolutionData,
    objectifsProgressionData,
    competencesRadarData,
  };
};
