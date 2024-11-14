import { useAuthContext } from './AuthContext'; // Usamos el contexto para verificar autenticación
import { Navigate } from 'react-router-dom';

const RootRedirect = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RootRedirect;
