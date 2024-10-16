import { createBrowserRouter, } from 'react-router-dom';
import Home from './pages/Home';
import { Charts } from './pages/Charts';
import { Dashboard } from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import RootRedirect from './routes/RootRedirect';

export const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboards',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/charts',
    element: (
      <ProtectedRoute>
        <Charts />
      </ProtectedRoute>
    ),
  },
]);
