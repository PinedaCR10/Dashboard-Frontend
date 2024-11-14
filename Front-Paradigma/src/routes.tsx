import { createBrowserRouter, } from 'react-router-dom';
import Home from './pages/Home';
import { Charts } from './pages/Charts';
import { Dashboards } from './pages/Dashboard';    

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
        <Charts /> 
    ),
  },
  {
    path: '/dashboards',
    element: (
        <Dashboards /> 
    ),
  },
]);
