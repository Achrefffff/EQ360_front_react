import { Target } from 'lucide-react';

const SppaObjectifsList = ({ objectifs }) => {
  if (!objectifs || objectifs.length === 0) {
    return (
      <div className="text-xs text-gray-500 text-center py-2">
        Aucun objectif associé
      </div>
    );
  }

  const statusColors = {
    'en_cours': 'bg-blue-100 text-blue-700 border-blue-200',
    'atteint': 'bg-green-100 text-green-700 border-green-200',
    'abandonne': 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {objectifs.map((objectif) => (
        <span
          key={objectif.id}
          className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full border ${statusColors[objectif.statut] || 'bg-gray-100 text-gray-700 border-gray-200'}`}
        >
          <Target size={12} />
          <span className="truncate max-w-[120px]">{objectif.nom}</span>
          {objectif.progression !== null && objectif.progression !== undefined && (
            <span className="text-[10px] opacity-75">({Math.round(objectif.progression)}%)</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default SppaObjectifsList;
