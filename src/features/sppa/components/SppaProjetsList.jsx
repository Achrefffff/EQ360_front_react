import { Folder } from 'lucide-react';

const SppaProjetsList = ({ projets }) => {
  if (!projets || projets.length === 0) {
    return (
      <div className="text-xs text-gray-500 text-center py-2">
        Aucun projet associé
      </div>
    );
  }

  const statusColors = {
    'en_cours': 'bg-blue-100 text-blue-700 border-blue-200',
    'termine': 'bg-green-100 text-green-700 border-green-200',
    'en_attente': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'annule': 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {projets.map((projet) => (
        <span
          key={projet.id}
          className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full border ${statusColors[projet.statut] || 'bg-gray-100 text-gray-700 border-gray-200'}`}
        >
          <Folder size={12} />
          <span className="truncate max-w-[120px]">{projet.nom}</span>
        </span>
      ))}
    </div>
  );
};

export default SppaProjetsList;
