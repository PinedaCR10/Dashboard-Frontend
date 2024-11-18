import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/AuthContext";

const Callback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Configurar autenticación
      login();

      // Opcional: guardar más información en localStorage
      localStorage.setItem("currentUser", JSON.stringify({ name: "Aaron", cedula: "504500..." }));

      // Limpiar la URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirigir al dashboard
      navigate("/dashboards");
    } else {
      // Si no hay token, redirigir al login
      const loginUrl = "https://eshop-loggin.vercel.app/";
      const redirectUrl = "https://dashboard-frontend-kohl.vercel.app/";
      window.location.href = `${loginUrl}?redirect=${encodeURIComponent(redirectUrl)}`;
    }
  }, [navigate, login]);

  return <div>Procesando autenticación...</div>;
};

export default Callback;
