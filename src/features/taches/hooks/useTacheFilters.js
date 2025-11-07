import { useState, useMemo } from 'react';

export const useTacheFilters = (taches) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statutFilter, setStatutFilter] = useState('');
  const [prioriteFilter, setPrioriteFilter] = useState('');
  const [sppaFilter, setSppaFilter] = useState('');
  const [projetFilter, setProjetFilter] = useState('');

  const filteredTaches = useMemo(() => {
    return taches.filter((tache) => {
      // Filtre par recherche (nom + description)
      const matchesSearch =
        searchTerm === '' ||
        tache.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tache.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre par statut
      const matchesStatut = statutFilter === '' || tache.statut === statutFilter;

      // Filtre par priorité
      const matchesPriorite = prioriteFilter === '' || tache.priorite === prioriteFilter;

      // Filtre par SPPA
      const matchesSppa = sppaFilter === '' || tache.sppaId?.toString() === sppaFilter;

      // Filtre par projet
      const matchesProjet = projetFilter === '' || tache.projet?.id?.toString() === projetFilter;

      return matchesSearch && matchesStatut && matchesPriorite && matchesSppa && matchesProjet;
    });
  }, [taches, searchTerm, statutFilter, prioriteFilter, sppaFilter, projetFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatutFilter('');
    setPrioriteFilter('');
    setSppaFilter('');
    setProjetFilter('');
  };

  return {
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
  };
};
