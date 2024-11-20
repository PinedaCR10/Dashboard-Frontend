import { Navigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';


const Protected = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();

  if (!token) {
    // Si no hay token, redirige a "No autorizado"
    return <Navigate to="/noauth" replace />;
  }

  return children;
};

export default Protected;
