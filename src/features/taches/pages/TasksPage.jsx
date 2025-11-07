import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaches } from "../hooks/useTaches";
import { useTacheFilters } from "../hooks/useTacheFilters";
import TacheCard from "../components/TacheCard";
import TacheModal from "../components/TacheModal";
import TacheForm from "../components/TacheForm";
import TacheSearchBar from "../components/TacheSearchBar";
import TacheFilters from "../components/TacheFilters";
import Button from "../../../components/ui/Button";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

const TasksPage = () => {
  const { taches, loading, createTache, updateTache, deleteTache } =
    useTaches();
  const {
    searchTerm,
    setSearchTerm,
    statutFilter,
    setStatutFilter,
    prioriteFilter,
    setPrioriteFilter,
    sppaFilter,
    setSppaFilter,
    projetFilter,
    setProjetFilter,
    filteredTaches,
    resetFilters,
  } = useTacheFilters(taches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTache, setSelectedTache] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [tacheToDelete, setTacheToDelete] = useState(null);

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

  const handleDelete = (id) => {
    setTacheToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (tacheToDelete) {
      await deleteTache(tacheToDelete);
      setTacheToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Mes Tâches
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

      {/* Barre de recherche */}
      <TacheSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
      />

      {/* Filtres */}
      <TacheFilters
        statutFilter={statutFilter}
        prioriteFilter={prioriteFilter}
        sppaFilter={sppaFilter}
        projetFilter={projetFilter}
        onStatutChange={setStatutFilter}
        onPrioriteChange={setPrioriteFilter}
        onSppaChange={setSppaFilter}
        onProjetChange={setProjetFilter}
        onReset={resetFilters}
      />

      {!taches || taches.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <p className="text-gray-600 mb-4">
            Aucune tâche enregistrée pour le moment 🕐
          </p>
          <Button onClick={handleCreate}>Créer ma première tâche</Button>
        </div>
      ) : filteredTaches.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <p className="text-gray-600 mb-4">
            Aucune tâche ne correspond à vos critères de recherche 🔍
          </p>
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTaches.map((tache) => (
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

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer cette tâche ?"
        message="Cette action est irréversible. Toutes les données associées seront définitivement supprimées."
      />
    </div>
  );
};

export default TasksPage;
