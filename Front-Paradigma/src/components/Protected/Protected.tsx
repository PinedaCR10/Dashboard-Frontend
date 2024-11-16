import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoAuth from "../../auth/NoAuth";


const Protected = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const getTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("token");
  };

  const getTokenFromCookies = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
  };

  useEffect(() => {
    const token = getTokenFromUrl() || getTokenFromCookies();

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos

      if (decoded.exp && decoded.exp < currentTime) {
        console.error("Token expirado");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <NoAuth />;
  }

  return <>{children}</>;
};

export default Protected;
