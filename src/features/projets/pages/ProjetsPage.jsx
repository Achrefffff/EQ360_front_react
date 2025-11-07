import { useState } from "react";
import { Plus } from "lucide-react";
import { useProjets } from "../hooks/useProjets";
import ProjetCard from "../components/ProjetCard";
import ProjetModal from "../components/ProjetModal";
import Button from "../../../components/ui/Button";

const ProjetsPage = () => {
  const { projets, loading, error, createProjet, updateProjet, deleteProjet } = useProjets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjet, setSelectedProjet] = useState(null);

  const handleCreate = () => {
    setSelectedProjet(null);
    setIsModalOpen(true);
  };

  const handleEdit = (projet) => {
    setSelectedProjet(projet);
    setIsModalOpen(true);
  };

  const handleSubmit = async (projetData) => {
    try {
      if (selectedProjet) {
        await updateProjet(selectedProjet.id, projetData);
      } else {
        await createProjet(projetData);
      }
      setIsModalOpen(false);
      setSelectedProjet(null);
    } catch (err) {
      console.error("Erreur lors de la soumission:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      await deleteProjet(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">📁 Mes Projets</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 text-gray-900 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
          style={{ backgroundColor: '#a855f7' }}
        >
          <Plus size={20} strokeWidth={2.5} />
          Nouveau projet
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 animate-pulse">
            Chargement des projets...
          </div>
        </div>
      ) : projets.length === 0 ? (
        <div className="text-center py-12 bg-white/50 rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-lg">Aucun projet pour le moment</p>
          <p className="text-gray-400 text-sm mt-2">Créez votre premier projet !</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projets.map((projet) => (
            <ProjetCard
              key={projet.id}
              projet={projet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ProjetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProjet(null);
        }}
        projet={selectedProjet}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProjetsPage;
