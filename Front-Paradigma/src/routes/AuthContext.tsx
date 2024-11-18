import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  isLogged: boolean;
  setAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Sincronizar el estado con localStorage
    const loggedIn = localStorage.getItem("isLogged") === "true";
    setIsLogged(loggedIn);
  }, []);

  const setAuthStatus = (status: boolean) => {
    localStorage.setItem("isLogged", status.toString());
    setIsLogged(status);
  };

  return (
    <AuthContext.Provider value={{ isLogged, setAuthStatus }}>
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
