import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoAuth from "../../auth/NoAuth";
import { jwtDecode } from "jwt-decode";


const Protected = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Obtener el token desde las cookies
  const getTokenFromCookies = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
  };

  useEffect(() => {
    const token = getTokenFromCookies();

    if (!token) {
      console.warn("No se encontró un token en las cookies.");
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token); // Decodifica el token
      console.log("Token decodificado:", decoded);

      const currentTime = Date.now() / 1000; // Tiempo actual en segundos

      // Verificar si el token está expirado
      if (decoded.exp && decoded.exp < currentTime) {
        console.error("Token expirado");
        setIsAuthenticated(false);
      } else {
        console.log("Token válido, usuario autenticado");
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      setIsAuthenticated(false);
    }
  }, []);

  // Renderizar mientras se verifica la autenticación
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  // Mostrar NoAuth si no está autenticado
  if (!isAuthenticated) {
    return <NoAuth />;
  }

  // Renderizar el contenido protegido si está autenticado
  return <>{children}</>;
};

export default Protected;
