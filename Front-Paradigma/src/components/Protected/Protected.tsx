import { Navigate } from 'react-router-dom';

const Protected = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/noauth" />; // Redirige si no hay token
  }

  return children; // Renderiza la página protegida
};

export default Protected;
