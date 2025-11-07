import { useDashboardData } from "../hooks/useDashboardData";
import StatCard from "../components/StatCard";
import TachesUrgentes from "../components/TachesUrgentes";
import ProjetsEnCours from "../components/ProjetsEnCours";

const DashboardHome = () => {
  const { taches, projets, stats, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 animate-pulse">
          Chargement du tableau de bord...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
        Tableau de bord
      </h1>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tâches"
          mainValue={stats.taches.actives}
          subValue={`${stats.taches.terminees} terminées`}
          color="#1afffb"
          bgColor="#e0fffe"
        />
        <StatCard
          title="Projets"
          mainValue={stats.projets.enCours}
          subValue={`${stats.projets.termines} terminés`}
          color="#a855f7"
          bgColor="#f3e8ff"
        />
        <StatCard
          title="Objectifs"
          mainValue={stats.objectifs.enCours}
          subValue={`${stats.objectifs.atteints} atteints`}
          color="#f59e0b"
          bgColor="#fef3c7"
        />
        <StatCard
          title="SPPA"
          mainValue={stats.sppas.total}
          subValue={`Niveau moyen: ${stats.sppas.niveauMoyen}`}
          color="#5cf5b2"
          bgColor="#d1fae5"
        />
      </div>

      {/* Tâches urgentes et Projets en cours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TachesUrgentes taches={taches} />
        <ProjetsEnCours projets={projets} />
      </div>
    </div>
  );
};

export default DashboardHome;
