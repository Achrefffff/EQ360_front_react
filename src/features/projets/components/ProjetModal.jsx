import { X } from "lucide-react";
import ProjetForm from "./ProjetForm";

const ProjetModal = ({ isOpen, onClose, projet, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {projet ? "Modifier le projet" : "Nouveau projet"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <ProjetForm projet={projet} onSubmit={onSubmit} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ProjetModal;
