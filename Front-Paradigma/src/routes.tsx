import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { Charts } from './pages/Charts';
import { Dashboards } from './pages/Dashboard';
import Protected from './components/Protected/Protected';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/charts',
    element: (
      <Protected>
        <Charts />
      </Protected>
    ),
  },
  {
    path: '/dashboards',
    element: (
      <Protected>
        <Dashboards />
      </Protected>
    ),
  },
]);
