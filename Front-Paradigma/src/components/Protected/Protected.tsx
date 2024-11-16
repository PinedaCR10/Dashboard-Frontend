import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Protected = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!jwtCookie) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decodedToken: any = jwtDecode(jwtCookie);
      const isValid = decodedToken.exp * 1000 > Date.now(); // Verificar expiración
      setIsAuthenticated(isValid);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    navigate("/noauth");
    return null;
  }

  return <>{children}</>;
};

export default Protected;
