import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoAuth from "../../auth/NoAuth";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Verificar el estado de autenticación desde localStorage
  const checkAuthStatus = () => {
    const isLogged = localStorage.getItem("isLogged");
    return isLogged === "true"; // Verifica si es `true` como cadena
  };

  useEffect(() => {
    if (checkAuthStatus()) {
      setIsAuthenticated(true);
    } else {
      console.warn("El usuario no está autenticado.");
      setIsAuthenticated(false);
    }
  }, []);

  // Mostrar mientras se verifica el estado de autenticación
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  // Redirigir a NoAuth si no está autenticado
  if (!isAuthenticated) {
    return <NoAuth />;
  }

  // Renderizar el contenido protegido si está autenticado
  return <>{children}</>;
};

export default Protected;
