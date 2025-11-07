import { useState, useEffect } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { sppaApi } from "../../../api/sppaApi";

const ProjetForm = ({ projet, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: "",
    typeProjet: "",
    categorie: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    budget: "",
    statut: "en_cours",
    sppaId: "",
  });
  const [sppas, setSppas] = useState([]);

  useEffect(() => {
    const fetchSppas = async () => {
      try {
        const data = await sppaApi.getAll();
        setSppas(data.items || []);
      } catch (err) {
        console.error("Erreur lors du chargement des SPPAs:", err);
      }
    };
    fetchSppas();
  }, []);

  useEffect(() => {
    if (projet) {
      setFormData({
        nom: projet.nom || "",
        typeProjet: projet.typeProjet || "",
        categorie: projet.categorie || "",
        description: projet.description || "",
        dateDebut: projet.dateDebut || "",
        dateFin: projet.dateFin || "",
        budget: projet.budget?.toString() || "",
        statut: projet.statut || "en_cours",
        sppaId: projet.sppaId?.toString() || "",
      });
    }
  }, [projet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : 0,
      sppaId: formData.sppaId ? parseInt(formData.sppaId) : null,
    };
    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nom du projet"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Type de projet"
          name="typeProjet"
          value={formData.typeProjet}
          onChange={handleChange}
        />
        <Input
          label="Catégorie"
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date de début"
          name="dateDebut"
          type="date"
          value={formData.dateDebut}
          onChange={handleChange}
        />
        <Input
          label="Date de fin"
          name="dateFin"
          type="date"
          value={formData.dateFin}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Budget (€)"
          name="budget"
          type="number"
          step="0.01"
          value={formData.budget}
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="en_attente">En attente</option>
            <option value="annule">Annulé</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SPPA associé (optionnel)
        </label>
        <select
          name="sppaId"
          value={formData.sppaId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Aucun SPPA</option>
          {sppas.map((sppa) => (
            <option key={sppa.id} value={sppa.id}>
              {sppa.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          style={{
            backgroundColor: "#a855f7",
            color: "white",
          }}
          className="hover:opacity-90"
        >
          {projet ? "Modifier" : "Créer"}
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary">
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default ProjetForm;
