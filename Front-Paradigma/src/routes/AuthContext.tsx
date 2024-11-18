import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  // Sincronizar con localStorage al cargar
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLogged") === "true";
    setIsLogged(loggedIn);
  }, []);

  // Función para iniciar sesión
  const login = () => {
    localStorage.setItem("isLogged", "true");
    setIsLogged(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("isLogged");
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
