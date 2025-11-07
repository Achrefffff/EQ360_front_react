import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    username: '',
    password: '',
    dateNaissance: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.post('/register', formData);
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || 'Erreur lors de l\'inscription';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Partie gauche - Formulaire */}
      <div className="w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Inscription</h2>
          <p className="text-gray-600 text-sm mb-4">Créez votre compte</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            compact
          />

          <Input
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            compact
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            compact
          />

          <Input
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            compact
          />

          <Input
            label="Date de naissance"
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            required
            compact
          />

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            compact
          />

          <Button type="submit" className="w-full mt-3" disabled={loading}>
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </Button>
        </form>

          <p className="text-center mt-3 text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Partie droite - Branding */}
      <div className="w-1/2 bg-black flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">EQ360</h1>
      </div>
    </div>
  );
};

export default RegisterPage;
