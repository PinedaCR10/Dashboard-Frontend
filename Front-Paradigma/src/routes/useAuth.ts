import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Aquí puedes validar si hay un token en el localStorage u otra lógica de autenticación
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Si hay token, está autenticado
  }, []);

  return { isAuthenticated };
};
