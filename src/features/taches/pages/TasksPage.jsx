import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaches } from "../hooks/useTaches";
import TacheCard from "../components/TacheCard";
import TacheModal from "../components/TacheModal";
import TacheForm from "../components/TacheForm";
import Button from "../../../components/ui/Button";

const TasksPage = () => {
  const { taches, loading, createTache, updateTache, deleteTache } =
    useTaches();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTache, setSelectedTache] = useState(null);

  const handleCreate = () => {
    setSelectedTache(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tache) => {
    setSelectedTache(tache);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    const result = selectedTache
      ? await updateTache(selectedTache.id, formData)
      : await createTache(formData);

    if (result.success) setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      await deleteTache(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          📋 Mes Tâches
        </h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 text-gray-900 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
          style={{ backgroundColor: '#1afffb' }}
        >
          <Plus size={20} strokeWidth={2.5} />
          Nouvelle tâche
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 animate-pulse">
            Chargement des tâches...
          </div>
        </div>
      ) : !taches || taches.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <p className="text-gray-600 mb-4">
            Aucune tâche enregistrée pour le moment 🕐
          </p>
          <Button onClick={handleCreate}>Créer ma première tâche</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {taches.map((tache) => (
            <TacheCard
              key={tache.id}
              tache={tache}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <TacheModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTache ? "Modifier la tâche" : "Nouvelle tâche"}
      >
        <TacheForm
          tache={selectedTache}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </TacheModal>
    </div>
  );
};

export default TasksPage;
