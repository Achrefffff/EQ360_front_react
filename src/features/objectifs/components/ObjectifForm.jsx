import { useState, useEffect } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { sppaApi } from "../../../api/sppaApi";
import { projetsApi } from "../../../api/projetsApi";

const ObjectifForm = ({ objectif, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    domaineVie: "",
    horizon: "Moyen",
    priorite: "Moyenne",
    statut: "en_cours",
    dateDebut: "",
    dateFin: "",
    sppaId: "",
    projetIds: [],
  });
  const [sppas, setSppas] = useState([]);
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sppaData, projetData] = await Promise.all([
          sppaApi.getAll(),
          projetsApi.getAll(),
        ]);
        setSppas(sppaData.items || []);
        setProjets(projetData.items || []);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (objectif) {
      setFormData({
        titre: objectif.titre || "",
        description: objectif.description || "",
        domaineVie: objectif.domaineVie || "",
        horizon: objectif.horizon || "Moyen",
        priorite: objectif.priorite || "Moyenne",
        statut: objectif.statut || "en_cours",
        dateDebut: objectif.dateDebut || "",
        dateFin: objectif.dateFin || "",
        sppaId: objectif.sppaId?.toString() || "",
        projetIds: objectif.projets?.map(p => p.id) || [],
      });
    }
  }, [objectif]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjetChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData((prev) => ({ ...prev, projetIds: selectedOptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      sppaId: formData.sppaId ? parseInt(formData.sppaId) : null,
      projetIds: formData.projetIds.length > 0 ? formData.projetIds : null,
    };
    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Titre de l'objectif"
        name="titre"
        value={formData.titre}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Domaine de vie"
          name="domaineVie"
          value={formData.domaineVie}
          onChange={handleChange}
          placeholder="Ex: Santé, Carrière..."
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horizon
          </label>
          <select
            name="horizon"
            value={formData.horizon}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="Court">Court terme</option>
            <option value="Moyen">Moyen terme</option>
            <option value="Long">Long terme</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priorité
          </label>
          <select
            name="priorite"
            value={formData.priorite}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="en_cours">En cours</option>
            <option value="atteint">Atteint</option>
            <option value="abandonne">Abandonné</option>
          </select>
        </div>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SPPA associé (optionnel)
        </label>
        <select
          name="sppaId"
          value={formData.sppaId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">Aucun SPPA</option>
          {sppas.map((sppa) => (
            <option key={sppa.id} value={sppa.id}>
              {sppa.nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Projets associés (optionnel - maintenez Ctrl/Cmd pour sélectionner plusieurs)
        </label>
        <select
          multiple
          value={formData.projetIds}
          onChange={handleProjetChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[120px]"
        >
          {projets.map((projet) => (
            <option key={projet.id} value={projet.id}>
              {projet.nom}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          {formData.projetIds.length} projet(s) sélectionné(s)
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          style={{
            backgroundColor: "#f59e0b",
            color: "white",
          }}
          className="hover:opacity-90"
        >
          {objectif ? "Modifier" : "Créer"}
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary">
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default ObjectifForm;
