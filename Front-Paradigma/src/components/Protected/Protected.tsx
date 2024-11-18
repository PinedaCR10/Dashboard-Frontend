import React from "react";
import { useAuth } from "../../routes/AuthContext";


const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    // Redirigir al login si el usuario no está autenticado
    const loginUrl = "https://eshop-loggin.vercel.app/";
    const redirectUrl = "https://dashboard-frontend-kohl.vercel.app/";
    window.location.href = `${loginUrl}?redirect=${encodeURIComponent(redirectUrl)}`;
    return null;
  }

  return <>{children}</>;
};

export default Protected;
