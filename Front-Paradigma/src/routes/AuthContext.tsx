import { createContext, useContext, ReactNode } from 'react';
import { AuthContextType } from '../types/authTypes';
import { useAuth } from '../hooks/useAuth'; // El hook useAuth que gestiona la lógica de autenticación

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, login, logout, register } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
  }
  return context;
};
