import React, { useEffect, useState } from "react";
import NoAuth from "../../auth/NoAuth";

// Asegúrate de importar el componente

const Protected = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("rw.authenticated="))
      ?.split("=")[1];

    setIsAuthenticated(authCookie === "true");
  }, []);

  // Mientras verificamos la autenticación
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  // Si no está autenticado, mostrar NoAuth
  if (!isAuthenticated) {
    return <NoAuth />;
  }

  // Si está autenticado, renderizar el contenido protegido
  return <>{children}</>;
};

export default Protected;
