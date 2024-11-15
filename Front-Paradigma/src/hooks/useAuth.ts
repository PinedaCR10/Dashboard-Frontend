import { useState } from 'react';
import { Login, LoginResponse } from '../types/authorizableType';
import { login as loginService, getProtectedData } from '../services/Login';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (loginData: Login) => {
    try {
      const response: LoginResponse = await loginService(loginData);
      setToken(response.access_token); // Cambiado a response.access_token
      localStorage.setItem('token', response.access_token); // Guarda el token en localStorage
      setError(null);
      return true;
    } catch (error: any) {
      if (error.message.includes('401')) {
        setError('Credenciales incorrectas');
      } else {
        setError('Error en la conexión al servidor');
      }
      return false; // Retorna false si el login falla
    }
  };
  
  

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const getProtectedResource = async () => {
    if (!token) {
      setError('No autorizado');
      return;
    }
    try {
      const data = await getProtectedData(token);
      setUserData(data);
      setError(null);
    } catch  {
      setError('No autorizado o error en la solicitud');
    }
  };

  const isAuthenticated = () => !!token;  // Retorna true si hay token

  return {
    login,
    logout,
    getProtectedResource,
    token,
    userData,
    error,
    isAuthenticated,  // Añadimos esta función
  };
};
