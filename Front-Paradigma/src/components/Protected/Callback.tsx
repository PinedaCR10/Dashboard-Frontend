import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Guardar token y datos de usuario en localStorage
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("currentUser", JSON.stringify({ }));

      // Limpiar la URL
      urlParams.delete("token");
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirigir al dashboard
      navigate("/dashboards");
    } else {
      // Si no hay token, redirigir al login
      const loginUrl = "https://eshop-loggin.vercel.app/";
      const redirectUrl = "https://dashboard-frontend-kohl.vercel.app/";
      window.location.href = `${loginUrl}?redirect=${encodeURIComponent(redirectUrl)}`;
    }
  }, [navigate]);

  return <div>Cargando autenticación...</div>;
};

export default Callback;
