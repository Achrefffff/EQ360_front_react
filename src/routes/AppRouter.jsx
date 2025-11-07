import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import DashboardHome from '../features/dashboard/pages/DashboardHome';
import TasksPage from '../features/taches/pages/TasksPage';
import ObjectifsPage from '../features/objectifs/pages/ObjectifsPage';
import ProjetsPage from '../features/projets/pages/ProjetsPage';
import SppaPage from '../features/sppa/pages/SppaPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="objectifs" element={<ObjectifsPage />} />
          <Route path="projets" element={<ProjetsPage />} />
          <Route path="sppa" element={<SppaPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
