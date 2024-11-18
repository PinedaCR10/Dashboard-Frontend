import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('authToken', token); // Guarda el token
      navigate('/dashboards'); // Redirige al dashboard o ruta protegida
    } else {
      navigate('/noauth'); // Redirige a una página de no autorizado
    }
  }, [navigate]);

  return <p>Validando autenticación...</p>;
};

export default Callback;
