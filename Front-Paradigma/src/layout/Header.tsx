import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuthContext } from '../routes/AuthContext'; // Cambia useAuth por useAuthContext

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthContext(); // Usar useAuthContext
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-950 shadow-md">
      <button className="text-3xl text-white" onClick={toggleMenu}>
        <FaBars />
      </button>

      <button
        className="text-white text-2xl"
        onClick={isAuthenticated ? handleLogout : handleLogin}
      >
        {isAuthenticated ? <FaSignOutAlt /> : <FaSignInAlt />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-950 shadow-lg transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col mt-10 p-4 space-y-4">
          <Link to="/" className="text-white" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/dashboards" className="text-white" onClick={toggleMenu}>
            Dashboards
          </Link>
          <Link to="/charts" className="text-white" onClick={toggleMenu}>
            Charts
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
