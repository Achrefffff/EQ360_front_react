import { useEffect, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { sppaApi } from "../../../api/sppaApi";
import { projetsApi } from "../../../api/projetsApi";

const TacheFilters = ({
  statutFilter,
  prioriteFilter,
  sppaFilter,
  projetFilter,
  onStatutChange,
  onPrioriteChange,
  onSppaChange,
  onProjetChange,
  onReset,
}) => {
  const [sppas, setSppas] = useState([]);
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sppaData, projetData] = await Promise.all([
          sppaApi.getAll(),
          projetsApi.getAll(),
        ]);
        setSppas(sppaData.items || []);
        setProjets(projetData.items || []);
      } catch (err) {
        console.error("Erreur lors du chargement des filtres:", err);
      }
    };
    fetchData();
  }, []);

  const hasActiveFilters =
    statutFilter || prioriteFilter || sppaFilter || projetFilter;

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Filter size={18} className="text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-700">Filtres</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw size={14} />
            Réinitialiser
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Filtre Statut */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Statut
          </label>
          <select
            value={statutFilter}
            onChange={(e) => onStatutChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les statuts</option>
            <option value="todo">À faire</option>
            <option value="in_progress">En cours</option>
            <option value="done">Terminée</option>
          </select>
        </div>

        {/* Filtre Priorité */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Priorité
          </label>
          <select
            value={prioriteFilter}
            onChange={(e) => onPrioriteChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les priorités</option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
        </div>

        {/* Filtre SPPA */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            SPPA
          </label>
          <select
            value={sppaFilter}
            onChange={(e) => onSppaChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les SPPA</option>
            {sppas.map((sppa) => (
              <option key={sppa.id} value={sppa.id}>
                {sppa.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre Projet */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Projet
          </label>
          <select
            value={projetFilter}
            onChange={(e) => onProjetChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les projets</option>
            {projets.map((projet) => (
              <option key={projet.id} value={projet.id}>
                {projet.nom}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TacheFilters;
