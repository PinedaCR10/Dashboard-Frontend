import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../routes/AuthContext';
import { UserType } from '../types/authTypes';

const Register = () => {
  const { register } = useAuthContext();
  const navigate = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser: UserType = { nombreCompleto, correo, usuario, contraseña };
      await register(newUser);
      alert('Registro exitoso');
      navigate('/login');
    } catch (err) {
      setError('Error durante el registro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl mb-4 text-center">Registro</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Nombre Completo</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Correo</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
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
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-500">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
