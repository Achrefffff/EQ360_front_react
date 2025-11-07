import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SppaForm = ({ sppa, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    couleur: '#3B82F6',
    competences: [],
    valeurs: [],
  });

  const [competenceInput, setCompetenceInput] = useState('');
  const [valeurInput, setValeurInput] = useState('');

  useEffect(() => {
    if (sppa) {
      setFormData({
        nom: sppa.nom || '',
        description: sppa.description || '',
        couleur: sppa.couleur || '#3B82F6',
        competences: sppa.competences || [],
        valeurs: sppa.valeurs || [],
      });
    }
  }, [sppa]);

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

  const addCompetence = () => {
    if (competenceInput.trim()) {
      setFormData(prev => ({
        ...prev,
        competences: [...prev.competences, competenceInput.trim()]
      }));
      setCompetenceInput('');
    }
  };

  const removeCompetence = (index) => {
    setFormData(prev => ({
      ...prev,
      competences: prev.competences.filter((_, i) => i !== index)
    }));
  };

  const addValeur = () => {
    if (valeurInput.trim()) {
      setFormData(prev => ({
        ...prev,
        valeurs: [...prev.valeurs, valeurInput.trim()]
      }));
      setValeurInput('');
    }
  };

  const removeValeur = (index) => {
    setFormData(prev => ({
      ...prev,
      valeurs: prev.valeurs.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nom du SPPA"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        required
        placeholder="Ex: Développeur, Artiste, Sportif..."
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
          placeholder="Décrivez cette facette de votre personnalité..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            name="couleur"
            value={formData.couleur}
            onChange={handleChange}
            className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-sm text-gray-600">{formData.couleur}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Compétences</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={competenceInput}
            onChange={(e) => setCompetenceInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetence())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ajouter une compétence..."
          />
          <button
            type="button"
            onClick={addCompetence}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.competences.map((comp, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
            >
              {comp}
              <button
                type="button"
                onClick={() => removeCompetence(index)}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Valeurs</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={valeurInput}
            onChange={(e) => setValeurInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addValeur())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ajouter une valeur..."
          />
          <button
            type="button"
            onClick={addValeur}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.valeurs.map((val, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2"
            >
              {val}
              <button
                type="button"
                onClick={() => removeValeur(index)}
                className="hover:text-green-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              {sppa ? 'Modification...' : 'Création...'}
            </span>
          ) : (
            sppa ? 'Modifier' : 'Créer'
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={isSubmitting}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default SppaForm;
