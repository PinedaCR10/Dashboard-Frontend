import { useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService'; // Asume que tienes estos servicios
import { UserType } from '../types/authTypes';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Verifica si hay un token para determinar si el usuario está autenticado
  }, []);

  // Función para manejar el login
  const login = async (usuario: string, contraseña: string): Promise<void> => {
    const user = await loginUser(usuario, contraseña);
    if (user) {
      localStorage.setItem('authToken', 'exampleToken'); // Guardamos el token
      setIsAuthenticated(true);
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  // Función para manejar el registro
  const register = async (newUser: UserType): Promise<void> => {
    const success = await registerUser(newUser);
    if (!success) {
      throw new Error('Error durante el registro');
    }
  };

  // Función para manejar el logout
  const logout = () => {
    localStorage.removeItem('authToken'); // Quitamos el token
    setIsAuthenticated(false); // Establecemos autenticación en falso
  };

  return { isAuthenticated, login, logout, register };
};
