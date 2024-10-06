import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { Charts } from './pages/Charts';
import { Dashboard } from './pages/Dashboard';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboards",
    element: <Dashboard />,
  },
  {
    path: "/charts",
    element: <Charts />,
  }
]);
