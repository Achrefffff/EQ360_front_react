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
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">EQ360</h1>
        <p className="text-gray-600 text-center mb-6">Créez votre compte</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />

          <Input
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Input
            label="Date de naissance"
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
