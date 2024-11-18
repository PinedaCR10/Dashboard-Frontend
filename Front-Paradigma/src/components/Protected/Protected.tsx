import React from "react";


const Protected = ({ children }: { children: React.ReactNode }) => {
  const isLogged = localStorage.getItem("isLogged");

  // Redirige al login si no está autenticado
  if (isLogged !== "true") {
    const loginUrl = "https://eshop-loggin.vercel.app/";
    const redirectUrl = "https://dashboard-frontend-kohl.vercel.app/";
    window.location.href = `${loginUrl}?redirect=${encodeURIComponent(redirectUrl)}`;
    return null; // Detén la renderización hasta que se redirija
  }

  return <>{children}</>;
};

export default Protected;
