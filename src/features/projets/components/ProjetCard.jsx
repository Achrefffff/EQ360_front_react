import { useState } from "react";
import { Edit, Trash2, Calendar, DollarSign, Folder, Check } from "lucide-react";
import { useProjets } from "../hooks/useProjets";

const ProjetCard = ({ projet, onEdit, onDelete }) => {
  const { updateProjet } = useProjets();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleComplete = async () => {
    if (projet.statut === 'termine') return;
    setIsToggling(true);
    await updateProjet(projet.id, { ...projet, statut: 'termine' });
    setIsToggling(false);
  };
  const getStatutColor = (statut) => {
    const colors = {
      "en_cours": "bg-blue-100 text-blue-700 border-blue-200",
      "termine": "bg-green-100 text-green-700 border-green-200",
      "en_attente": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "annule": "bg-red-100 text-red-700 border-red-200",
    };
    return colors[statut] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fadeInUp">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg font-bold shadow-inner">
            {projet.nom?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {projet.nom}
            </h3>
            {projet.typeProjet && (
              <p className="text-sm text-gray-500">{projet.typeProjet}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleToggleComplete}
            disabled={isToggling || projet.statut === 'termine'}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-200 ${
              projet.statut === 'termine' ? 'bg-green-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            }`}
            title={projet.statut === 'termine' ? 'Projet terminé' : 'Marquer comme terminé'}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                projet.statut === 'termine' ? 'translate-x-4.5' : 'translate-x-0.5'
              }`}
            />
          </button>
          <button
            onClick={() => onEdit(projet)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(projet.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {projet.description && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {projet.description}
        </p>
      )}

      <div className="space-y-3 mb-4">
        {projet.categorie && (
          <div className="flex items-center gap-2 text-sm">
            <Folder size={16} className="text-purple-500" />
            <span className="text-gray-600">Catégorie:</span>
            <span className="font-medium text-gray-900">{projet.categorie}</span>
          </div>
        )}

        {(projet.dateDebut || projet.dateFin) && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-blue-500" />
            <span className="text-gray-600">
              {projet.dateDebut && new Date(projet.dateDebut).toLocaleDateString('fr-FR')}
              {projet.dateDebut && projet.dateFin && ' → '}
              {projet.dateFin && new Date(projet.dateFin).toLocaleDateString('fr-FR')}
            </span>
          </div>
        )}

        {projet.budget !== null && projet.budget !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign size={16} className="text-green-500" />
            <span className="text-gray-600">Budget:</span>
            <span className="font-medium text-gray-900">{projet.budget} €</span>
          </div>
        )}
      </div>

      {projet.sppa && (
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            SPPA: {projet.sppa.nom}
          </span>
        </div>
      )}

      {projet.stats && projet.stats.totalTaches > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Progression
            </span>
            <span className="text-xs font-semibold text-purple-600">
              {projet.stats.tauxCompletion}%
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
              style={{ width: `${projet.stats.tauxCompletion}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {projet.stats.tachesTerminees} / {projet.stats.totalTaches} tâches complétées
          </p>
        </div>
      )}

      {projet.statut && (
        <div className="border-t border-gray-100 pt-4">
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatutColor(projet.statut)}`}>
            {projet.statut.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjetCard;
