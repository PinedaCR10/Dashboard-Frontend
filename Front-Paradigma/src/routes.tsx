import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { Charts } from './pages/Charts';
import { Dashboards } from './pages/Dashboard';
import Protected from './components/Protected/Protected';
import NoAuth from './auth/NoAuth';
import TokenHandler from './components/Protected/TokenHandler';


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <TokenHandler>
        <Protected>
        <Home />
        </Protected>
      </TokenHandler>
    ),
  },
  {
    path: '/charts',
    element: (
      <TokenHandler>
        <Protected>
          <Charts />
        </Protected>
      </TokenHandler>
    ),
  },
  {
    path: '/dashboards',
    element: (
      <TokenHandler>
        <Protected>
          <Dashboards />
        </Protected>
      </TokenHandler>
    ),
  },
  {
    path: '/noauth',
    element: <NoAuth />,
  },
]);
