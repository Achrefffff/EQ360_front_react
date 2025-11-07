import { useState } from "react";
import { Plus } from "lucide-react";
import { useObjectifs } from "../hooks/useObjectifs";
import ObjectifCard from "../components/ObjectifCard";
import ObjectifModal from "../components/ObjectifModal";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

const ObjectifsPage = () => {
  const { objectifs, loading, error, createObjectif, updateObjectif, deleteObjectif } = useObjectifs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObjectif, setSelectedObjectif] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [objectifToDelete, setObjectifToDelete] = useState(null);

  const handleCreate = () => {
    setSelectedObjectif(null);
    setIsModalOpen(true);
  };

  const handleEdit = (objectif) => {
    setSelectedObjectif(objectif);
    setIsModalOpen(true);
  };

  const handleSubmit = async (objectifData) => {
    try {
      if (selectedObjectif) {
        await updateObjectif(selectedObjectif.id, objectifData);
      } else {
        await createObjectif(objectifData);
      }
      setIsModalOpen(false);
      setSelectedObjectif(null);
    } catch (err) {
      console.error("Erreur lors de la soumission:", err);
    }
  };

  const handleDelete = (id) => {
    setObjectifToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (objectifToDelete) {
      await deleteObjectif(objectifToDelete);
      setObjectifToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Mes Objectifs</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 text-gray-900 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
          style={{ backgroundColor: '#f59e0b' }}
        >
          <Plus size={20} strokeWidth={2.5} />
          Nouvel objectif
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {objectifs.length === 0 ? (
        <div className="text-center py-12 bg-white/50 rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-lg">Aucun objectif pour le moment</p>
          <p className="text-gray-400 text-sm mt-2">Créez votre premier objectif !</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectifs.map((objectif) => (
            <ObjectifCard
              key={objectif.id}
              objectif={objectif}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ObjectifModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedObjectif(null);
        }}
        objectif={selectedObjectif}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer cet objectif ?"
        message="Cette action est irréversible. L'objectif et toutes ses données seront définitivement supprimés."
      />
    </div>
  );
};

export default ObjectifsPage;
