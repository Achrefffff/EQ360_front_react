import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import apiClient from '../../../api/apiClient';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/login', { email, password });
      const { token } = response.data;
      
      if (token) {
        login(token);
        navigate('/dashboard');
      } else {
        setError('Token non reçu du serveur');
      }
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || 'Email ou mot de passe incorrect';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Partie gauche - Formulaire */}
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
          <p className="text-gray-600 mb-6">Connectez-vous à votre compte</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

          <p className="text-center mt-4 text-gray-600">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              S'inscrire
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

export default LoginPage;
