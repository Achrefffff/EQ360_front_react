import { useState } from "react";
import { Plus } from "lucide-react";
import { useSppas } from "../hooks/useSppas";
import SppaCard from "../components/SppaCard";
import SppaForm from "../components/SppaForm";
import TacheModal from "../../taches/components/TacheModal";
import Button from "../../../components/ui/Button";

const SppaPage = () => {
  const { sppas, loading, createSppa, updateSppa, deleteSppa } = useSppas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSppa, setSelectedSppa] = useState(null);

  const handleCreate = () => {
    setSelectedSppa(null);
    setIsModalOpen(true);
  };

  const handleEdit = (sppa) => {
    setSelectedSppa(sppa);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    const result = selectedSppa
      ? await updateSppa(selectedSppa.id, formData)
      : await createSppa(formData);
    if (result.success) setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce SPPA ?")) {
      await deleteSppa(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            🧩 Mes SPPA
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Explorez vos Sous-Personnalités d’Activité et suivez leur évolution.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 text-gray-900 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
          style={{ backgroundColor: '#5cf5b2' }}
        >
          <Plus size={20} strokeWidth={2.5} />
          Nouveau SPPA
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 animate-pulse">
            Chargement des SPPA...
          </div>
        </div>
      ) : !sppas || sppas.length === 0 ? (
        <div className="bg-white/80 border border-gray-200 rounded-2xl p-12 text-center shadow-sm backdrop-blur-sm">
          <p className="text-gray-600 mb-4">
            Aucun SPPA enregistré pour le moment.
          </p>
          <Button
            onClick={handleCreate}
            className="bg-linear-to-r from-emerald-400 to-teal-500 text-white"
          >
            Créer votre premier SPPA
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sppas.map((sppa) => (
            <SppaCard
              key={sppa.id}
              sppa={sppa}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <TacheModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSppa ? "Modifier le SPPA" : "Nouveau SPPA"}
      >
        <SppaForm
          sppa={selectedSppa}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </TacheModal>
    </div>
  );
};

export default SppaPage;
