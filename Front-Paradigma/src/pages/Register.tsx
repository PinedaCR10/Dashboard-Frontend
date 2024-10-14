import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserType}  from '../types/UserType';


const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Validación del formato del correo
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!fullName || !email || !username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const users: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setError('El nombre de usuario ya está en uso.');
      return;
    }

    // Si todo es válido, registramos al usuario en localStorage
    const newUser: UserType = { fullName, email, username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso. Ahora inicia sesión.');
    navigate('/login');
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Correo Electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
