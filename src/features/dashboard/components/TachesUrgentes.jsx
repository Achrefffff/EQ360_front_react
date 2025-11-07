import { AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TachesUrgentes = ({ taches }) => {
  // Filtrer les tâches urgentes (priorité Haute + pas terminées)
  const tachesUrgentes = taches
    .filter((tache) => tache.priorite === "Haute" && tache.statut !== "done")
    .slice(0, 5);

  // Filtrer les tâches avec échéance proche (< 3 jours)
  const today = new Date();
  const tachesEcheanceProche = taches
    .filter((tache) => {
      if (!tache.dateFin || tache.statut === "done") return false;
      const echeance = new Date(tache.dateFin);
      const diffDays = Math.ceil((echeance - today) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    })
    .slice(0, 5);

  // Combiner et dédupliquer
  const tachesAffichees = [
    ...tachesUrgentes,
    ...tachesEcheanceProche.filter(
      (t) => !tachesUrgentes.find((tu) => tu.id === t.id)
    ),
  ].slice(0, 5);

  if (tachesAffichees.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            Tâches urgentes
          </h2>
        </div>
        <p className="text-gray-500 text-center py-8">
          Aucune tâche urgente pour le moment 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <AlertCircle size={20} className="text-red-500" />
          Tâches urgentes
        </h2>
        <Link
          to="/dashboard/tasks"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          Voir tout
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-3">
        {tachesAffichees.map((tache) => {
          const isEcheanceProche =
            tache.dateFin &&
            Math.ceil(
              (new Date(tache.dateFin) - today) / (1000 * 60 * 60 * 24)
            ) <= 3;

          return (
            <div
              key={tache.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">
                  {tache.nom}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {tache.priorite === "Haute" && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                      Haute priorité
                    </span>
                  )}
                  {isEcheanceProche && tache.dateFin && (
                    <span className="flex items-center gap-1 text-xs text-orange-600">
                      <Calendar size={12} />
                      {new Date(tache.dateFin).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TachesUrgentes;
