import { createBrowserRouter, } from 'react-router-dom';
import Home from './pages/Home';
import { Charts } from './pages/Charts';
import { Dashboards } from './pages/Dashboard';    
import ProtectedRoute from './routes/ProtectedRoute';
import NoAuthorizable from './pages/Noauthorizable';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <Home />
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
  {
    path: '/dashboards',
    element: (
      <ProtectedRoute>
        <Dashboards /> 
      </ProtectedRoute>
    ),
  },
  {
    path: '/NoAuthorizable',
    element: (
      <NoAuthorizable />
    )
  }
]);
