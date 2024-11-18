import React from "react";
import NoAuth from "../../auth/NoAuth";
// Importa el componente para manejar usuarios no autorizados

const Protected = ({ children }: { children: React.ReactNode }) => {
  // Obtener el token desde la URL o localStorage
  const token = new URLSearchParams(window.location.search).get("token") || localStorage.getItem("authToken");

  if (!token) {
    // Mostrar componente de "No autorizado" si no hay token
    return <NoAuth />;
  }

  // Si el token viene en la URL, guardarlo en localStorage
  if (!localStorage.getItem("authToken") && token) {
    localStorage.setItem("authToken", token);
    window.history.replaceState({}, document.title, window.location.pathname); // Limpiar la URL
  }

  return <>{children}</>;
};

export default Protected;
