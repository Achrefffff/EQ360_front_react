import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { isAuthenticated, token, login, logout } = useAuthStore();

  return {
    isAuthenticated,
    token,
    login,
    logout,
  };
};
