import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from './context/UserProvider/UserProvider';// Importa el AuthProvider creado
import { router } from './routes';
import './index.css';
import { AuthProvider } from './routes/AuthContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* Envolvemos el árbol con AuthProvider */}
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
