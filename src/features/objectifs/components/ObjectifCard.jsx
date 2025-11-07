import { useState } from "react";
import { Edit, Trash2, Calendar, Target, TrendingUp, Check } from "lucide-react";
import { useObjectifs } from "../hooks/useObjectifs";

const ObjectifCard = ({ objectif, onEdit, onDelete }) => {
  const { updateObjectif } = useObjectifs();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleComplete = async () => {
    if (objectif.statut === 'atteint') return;
    setIsToggling(true);
    await updateObjectif(objectif.id, { ...objectif, statut: 'atteint' });
    setIsToggling(false);
  };
  const getStatutColor = (statut) => {
    const colors = {
      "en_cours": "bg-blue-100 text-blue-700 border-blue-200",
      "atteint": "bg-green-100 text-green-700 border-green-200",
      "abandonne": "bg-red-100 text-red-700 border-red-200",
    };
    return colors[statut] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getPrioriteColor = (priorite) => {
    const colors = {
      "Haute": "bg-red-100 text-red-700 border-red-200",
      "Moyenne": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Basse": "bg-green-100 text-green-700 border-green-200",
    };
    return colors[priorite] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fadeInUp">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-lg font-bold shadow-inner">
            {objectif.titre?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {objectif.titre}
            </h3>
            {objectif.domaineVie && (
              <p className="text-sm text-gray-500">{objectif.domaineVie}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleToggleComplete}
            disabled={isToggling || objectif.statut === 'atteint'}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-200 ${
              objectif.statut === 'atteint' ? 'bg-green-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            }`}
            title={objectif.statut === 'atteint' ? 'Objectif atteint' : 'Marquer comme atteint'}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                objectif.statut === 'atteint' ? 'translate-x-4.5' : 'translate-x-0.5'
              }`}
            />
          </button>
          <button
            onClick={() => onEdit(objectif)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(objectif.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {objectif.description && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {objectif.description}
        </p>
      )}

      <div className="space-y-3 mb-4">
        {objectif.horizon && (
          <div className="flex items-center gap-2 text-sm">
            <Target size={16} className="text-orange-500" />
            <span className="text-gray-600">Horizon:</span>
            <span className="font-medium text-gray-900">{objectif.horizon}</span>
          </div>
        )}

        {(objectif.dateDebut || objectif.dateFin) && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-blue-500" />
            <span className="text-gray-600">
              {objectif.dateDebut && new Date(objectif.dateDebut).toLocaleDateString('fr-FR')}
              {objectif.dateDebut && objectif.dateFin && ' → '}
              {objectif.dateFin && new Date(objectif.dateFin).toLocaleDateString('fr-FR')}
            </span>
          </div>
        )}
      </div>

      {objectif.progression !== null && objectif.progression !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Progression
            </span>
            <span className="text-xs font-semibold text-orange-600">
              {objectif.progression}%
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-700"
              style={{ width: `${objectif.progression}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {objectif.priorite && (
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPrioriteColor(objectif.priorite)}`}>
            {objectif.priorite}
          </span>
        )}
        {objectif.sppa && (
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            SPPA: {objectif.sppa.nom}
          </span>
        )}
      </div>

      {objectif.projets && objectif.projets.length > 0 && (
        <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
          <p className="text-xs font-semibold text-purple-700 mb-2 uppercase tracking-wide">
            Projets ({objectif.projets.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {objectif.projets.map((projet) => (
              <span
                key={projet.id}
                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-white text-purple-700 border border-purple-200"
              >
                {projet.nom}
                {projet.statut === 'termine' && ' ✓'}
              </span>
            ))}
          </div>
        </div>
      )}

      {objectif.statut && (
        <div className="border-t border-gray-100 pt-4">
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatutColor(objectif.statut)}`}>
            {objectif.statut.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default ObjectifCard;
