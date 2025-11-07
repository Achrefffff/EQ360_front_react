import { useState } from "react";
import { Edit, Trash2, Award, Clock, TrendingUp, ListTodo, Folder, Target } from "lucide-react";
import SppaTachesList from "./SppaTachesList";
import SppaProjetsList from "./SppaProjetsList";
import SppaObjectifsList from "./SppaObjectifsList";

const SppaCard = ({ sppa, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState("taches");
  const currentXp = sppa.experienceXp || 0;
  const currentLevel = sppa.niveau || 1;
  const xpForCurrentLevel = (currentLevel - 1) * 100;
  const xpForNextLevel = currentLevel * 100;
  const xpInCurrentLevel = currentXp - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - currentXp;
  const progressPercentage = currentLevel > 0 ? Math.min((xpInCurrentLevel / 100) * 100, 100) : 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fadeInUp">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-inner"
            style={{ backgroundColor: sppa.couleur || "#3B82F6" }}
          >
            {sppa.nom?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {sppa.nom}
            </h3>
            <p className="text-sm text-gray-500">Niveau {sppa.niveau || 1}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(sppa)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(sppa.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Description */}
      {sppa.description && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {sppa.description}
        </p>
      )}

      {/* Compétences */}
      {sppa.competences?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Compétences
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sppa.competences.map((comp, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-100"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Valeurs */}
      {sppa.valeurs?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Valeurs
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sppa.valeurs.map((val, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-100"
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Barre de progression XP — version élégante */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Progression
          </span>
          <span className="text-xs font-semibold text-blue-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>

        <div className="relative h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          {/* Effet lumineux subtil */}
          <div
            className="absolute top-0 left-0 h-full w-full rounded-full bg-linear-to-r from-white/20 via-transparent to-white/10 animate-pulse"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          {/* Indicateur rond */}
          <div
            className="absolute -top-1 w-4 h-4 rounded-full bg-white shadow-md border border-blue-400 transition-all duration-700 ease-out"
            style={{ left: `calc(${progressPercentage}% - 8px)` }}
          ></div>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          <span className="font-semibold text-blue-600">
            {xpNeededForNextLevel > 0 ? Math.round(xpNeededForNextLevel) : 0} XP
          </span>{" "}
          avant le niveau{" "}
          <span className="font-semibold text-gray-800">
            {currentLevel + 1}
          </span>
        </p>
      </div>

      {/* Tâches, Projets et Objectifs associés */}
      {((sppa.taches && sppa.taches.length > 0) || (sppa.projets && sppa.projets.length > 0) || (sppa.objectifs && sppa.objectifs.length > 0)) && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab("taches")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "taches"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ListTodo size={14} />
              Tâches ({sppa.taches?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("projets")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "projets"
                  ? "bg-purple-500 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Folder size={14} />
              Projets ({sppa.projets?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("objectifs")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "objectifs"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Target size={14} />
              Objectifs ({sppa.objectifs?.length || 0})
            </button>
          </div>
          {activeTab === "taches" ? (
            <SppaTachesList taches={sppa.taches} />
          ) : activeTab === "projets" ? (
            <SppaProjetsList projets={sppa.projets} />
          ) : (
            <SppaObjectifsList objectifs={sppa.objectifs} />
          )}
        </div>
      )}

      {/* Statistiques */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span className="flex items-center gap-2 text-gray-600">
            <Clock size={16} className="text-blue-500" />
            Heures
          </span>
          <span className="font-semibold text-gray-900">{sppa.heuresAccumulees || 0}h</span>
        </div>
      </div>
    </div>
  );
};

export default SppaCard;
