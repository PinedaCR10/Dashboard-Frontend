import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Se eliminó useLocation ya que no es necesario
import { useAuthContext } from '../routes/AuthContext';

const Login = () => {
  const { login } = useAuthContext(); // Usamos el hook del contexto
  const navigate = useNavigate(); // Para redirigir al usuario

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Intentamos iniciar sesión con los valores proporcionados
      await login(usuario, contraseña);
      
      // Redirigimos al usuario al home tras el login exitoso
      navigate('/home', { replace: true }); 
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl mb-4 text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
