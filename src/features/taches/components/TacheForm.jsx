import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useSppas } from '../../sppa/hooks/useSppas';
import { useProjets } from '../../projets/hooks/useProjets';

const TacheForm = ({ tache, onSubmit, onCancel }) => {
  const { sppas } = useSppas();
  const { projets } = useProjets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    priorite: 'Moyenne',
    dureeEstimee: 1,
    difficulte: 5,
    enthousiasme: 5,
    statut: 'todo',
    dateDebut: '',
    dateFin: '',
    sppaId: '',
    projetId: '',
  });

  useEffect(() => {
    if (tache) {
      setFormData({
        nom: tache.nom || '',
        description: tache.description || '',
        priorite: tache.priorite || 'Moyenne',
        dureeEstimee: tache.dureeEstimee || 1,
        difficulte: tache.difficulte || 5,
        enthousiasme: tache.enthousiasme || 5,
        statut: tache.statut || 'todo',
        dateDebut: tache.dateDebut || '',
        dateFin: tache.dateFin || '',
        sppaId: tache.sppaId ? String(tache.sppaId) : '',
        projetId: tache.projet?.id ? String(tache.projet.id) : '',
      });
    }
  }, [tache]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nom de la tâche"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          required
        />
      </div>



      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
          <select
            name="priorite"
            value={formData.priorite}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todo">À faire</option>
            <option value="in_progress">En cours</option>
            <option value="done">Terminée</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Durée (heures)"
          name="dureeEstimee"
          type="number"
          step="0.5"
          value={formData.dureeEstimee}
          onChange={handleChange}
          required
        />

        <Input
          label="Difficulté (1-10)"
          name="difficulte"
          type="number"
          min="1"
          max="10"
          value={formData.difficulte}
          onChange={handleChange}
          required
        />

        <Input
          label="Enthousiasme (1-10)"
          name="enthousiasme"
          type="number"
          min="1"
          max="10"
          value={formData.enthousiasme}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SPPA</label>
          <select
            name="sppaId"
            value={formData.sppaId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Aucun SPPA</option>
            {sppas && sppas.map((sppa) => (
              <option key={sppa.id} value={sppa.id}>
                {sppa.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Projet</label>
          <select
            name="projetId"
            value={formData.projetId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Aucun projet</option>
            {projets && projets.map((projet) => (
              <option key={projet.id} value={projet.id}>
                {projet.nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Date d'échéance"
        name="dateFin"
        type="date"
        value={formData.dateFin}
        onChange={handleChange}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              {tache ? 'Modification...' : 'Création...'}
            </span>
          ) : (
            tache ? 'Modifier' : 'Créer'
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={isSubmitting}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default TacheForm;
