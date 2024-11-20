import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';


const TokenHandler = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Guarda el token en el contexto global
      setToken(token);

      // Limpia la URL eliminando el token
      navigate(location.pathname, { replace: true });
    } else if (!setToken) {
      // Si no hay token en el contexto, redirige al login externo
      const rutaLogin = "https://eshop-loggin.vercel.app/";
      const rutaFront = "https://dashboard-frontend-kohl.vercel.app/";
      window.location.href = `${rutaLogin}?redirect=${encodeURIComponent(rutaFront)}`;
    }
  }, [location, navigate, setToken]);

  return children; // Renderiza el contenido solo si hay un token
};

export default TokenHandler;
