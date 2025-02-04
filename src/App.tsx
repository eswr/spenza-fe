import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from '@/hooks/use-auth';

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
