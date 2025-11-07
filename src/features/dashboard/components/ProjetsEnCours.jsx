import { Folder, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjetsEnCours = ({ projets }) => {
  const projetsEnCours = projets
    .filter((projet) => projet.statut === "en_cours")
    .slice(0, 3);

  if (projetsEnCours.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Folder size={20} className="text-purple-500" />
            Projets en cours
          </h2>
        </div>
        <p className="text-gray-500 text-center py-8">
          Aucun projet en cours
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Folder size={20} className="text-purple-500" />
          Projets en cours
        </h2>
        <Link
          to="/dashboard/projets"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          Voir tout
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {projetsEnCours.map((projet) => (
          <div
            key={projet.id}
            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{projet.nom}</h3>
              {projet.sppa && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-white text-purple-700 border border-purple-200">
                  {projet.sppa.nom}
                </span>
              )}
            </div>

            {projet.stats && projet.stats.totalTaches > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Progression</span>
                  <span className="text-xs font-semibold text-purple-600">
                    {projet.stats.tauxCompletion}%
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-white overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
                    style={{ width: `${projet.stats.tauxCompletion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {projet.stats.tachesTerminees} / {projet.stats.totalTaches}{" "}
                  tâches
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjetsEnCours;
