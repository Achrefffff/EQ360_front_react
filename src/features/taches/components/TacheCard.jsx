import { useState } from "react";
import { Edit, Trash2, Clock, Target, Folder, Sparkles, Check } from "lucide-react";
import { useTaches } from "../hooks/useTaches";

const TacheCard = ({ tache, onEdit, onDelete }) => {
  const { updateTache } = useTaches();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleComplete = async () => {
    if (tache.statut === 'done') return;
    setIsToggling(true);
    await updateTache(tache.id, { ...tache, statut: 'done' });
    setIsToggling(false);
  };
  const priorityColors = {
    Haute: "bg-red-100 text-red-700 border-red-200",
    Moyenne: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Basse: "bg-green-100 text-green-700 border-green-200",
  };

  const statusColors = {
    todo: "bg-gray-100 text-gray-700 border-gray-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    done: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {tache.nom}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleToggleComplete}
            disabled={isToggling || tache.statut === 'done'}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-200 ${
              tache.statut === 'done' ? 'bg-emerald-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            }`}
            title={tache.statut === 'done' ? 'Tâche terminée' : 'Marquer comme terminée'}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                tache.statut === 'done' ? 'translate-x-4.5' : 'translate-x-0.5'
              }`}
            />
          </button>
          <button
            onClick={() => onEdit(tache)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(tache.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {tache.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            priorityColors[tache.priorite] || "bg-gray-100 text-gray-700"
          }`}
        >
          Priorité : {tache.priorite}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            statusColors[tache.statut] || "bg-gray-100 text-gray-700"
          }`}
        >
          Statut : {tache.statut}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{tache.dureeEstimee}h estimées</span>
        </div>
        <div className="flex items-center gap-1">
          <Target size={16} />
          <span>Difficulté : {tache.difficulte}/10</span>
        </div>
      </div>

      {(tache.sppa || tache.projet) && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {tache.sppa && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles size={12} />
              {tache.sppa.nom}
            </span>
          )}
          {tache.projet && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              <Folder size={12} />
              {tache.projet.nom}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TacheCard;
