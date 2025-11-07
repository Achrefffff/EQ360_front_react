import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const Header = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get('/profile');
        setUserName(response.data.prenom || response.data.nom || 'Utilisateur');
      } catch (error) {
        console.error('Erreur chargement profil:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Bienvenue {userName}</h2>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
      >
        <LogOut size={20} />
        <span>Déconnexion</span>
      </button>
    </header>
  );
};

export default Header;
