import { create } from 'zustand';
import { tachesApi } from '../api/tachesApi';
import { projetsApi } from '../api/projetsApi';
import { sppaApi } from '../api/sppaApi';
import { objectifsApi } from '../api/objectifsApi';

export const useDataStore = create((set, get) => ({
  // État
  taches: [],
  projets: [],
  sppas: [],
  objectifs: [],
  loading: false,
  initialized: false,

  // Charger toutes les données
  fetchAll: async () => {
    // Si déjà chargé, ne pas recharger
    if (get().initialized) return;

    set({ loading: true });
    try {
      const [tachesData, projetsData, sppaData, objectifsData] = await Promise.all([
        tachesApi.getAll(),
        projetsApi.getAll(),
        sppaApi.getAll(),
        objectifsApi.getAll(),
      ]);

      set({
        taches: tachesData.items || [],
        projets: projetsData.items || [],
        sppas: sppaData.items || [],
        objectifs: objectifsData.items || [],
        loading: false,
        initialized: true,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      set({ loading: false });
    }
  },

  // Rafraîchir les tâches
  refreshTaches: async () => {
    try {
      const data = await tachesApi.getAll();
      set({ taches: data.items || [] });
    } catch (error) {
      console.error('Erreur refresh tâches:', error);
    }
  },

  // Rafraîchir les projets
  refreshProjets: async () => {
    try {
      const data = await projetsApi.getAll();
      set({ projets: data.items || [] });
    } catch (error) {
      console.error('Erreur refresh projets:', error);
    }
  },

  // Rafraîchir les SPPA
  refreshSppas: async () => {
    try {
      const data = await sppaApi.getAll();
      set({ sppas: data.items || [] });
    } catch (error) {
      console.error('Erreur refresh SPPA:', error);
    }
  },

  // Rafraîchir les objectifs
  refreshObjectifs: async () => {
    try {
      const data = await objectifsApi.getAll();
      set({ objectifs: data.items || [] });
    } catch (error) {
      console.error('Erreur refresh objectifs:', error);
    }
  },

  // Réinitialiser le store (lors de la déconnexion)
  reset: () => {
    set({
      taches: [],
      projets: [],
      sppas: [],
      objectifs: [],
      loading: false,
      initialized: false,
    });
  },
}));
