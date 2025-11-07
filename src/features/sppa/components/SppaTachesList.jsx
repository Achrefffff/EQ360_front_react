import { CheckCircle2, Circle } from 'lucide-react';

const SppaTachesList = ({ taches }) => {
  if (!taches || taches.length === 0) {
    return (
      <div className="text-xs text-gray-500 text-center py-2">
        Aucune tâche associée
      </div>
    );
  }

  const statusColors = {
    'todo': 'text-gray-500',
    'in_progress': 'text-blue-500',
    'done': 'text-green-500',
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {taches.map((tache) => (
        <span
          key={tache.id}
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
        >
          {tache.statut === 'done' ? (
            <CheckCircle2 size={12} className={statusColors[tache.statut]} />
          ) : (
            <Circle size={12} className={statusColors[tache.statut]} />
          )}
          <span className="truncate max-w-[120px]">{tache.nom}</span>
        </span>
      ))}
    </div>
  );
};

export default SppaTachesList;
