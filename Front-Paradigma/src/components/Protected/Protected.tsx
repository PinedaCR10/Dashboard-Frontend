import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    // Redirigir al login si el usuario no está autenticado
    return <Navigate to="/noauth" replace />;
  }

  return <>{children}</>;
};

export default Protected;
