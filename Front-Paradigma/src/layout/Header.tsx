import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSignInAlt, FaSignOutAlt, FaHome, FaTachometerAlt, FaChartBar } from 'react-icons/fa';
import { useAuthContext } from '../routes/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthContext();
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
    <div className="relative flex justify-between items-center p-4 bg-blue-950 shadow-md">
      <button className="text-3xl text-white z-20" onClick={toggleMenu}>
        <FaBars />
      </button>

      <button
        className="text-white text-2xl z-20"
        onClick={isAuthenticated ? handleLogout : handleLogin}
      >
        {isAuthenticated ? <FaSignOutAlt /> : <FaSignInAlt />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-950 shadow-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 10 }}
      >
        <nav className="flex flex-col mt-10 p-4 space-y-4">
          <Link to="/" className="flex items-center text-white" onClick={toggleMenu}>
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/dashboards" className="flex items-center text-white" onClick={toggleMenu}>
            <FaTachometerAlt className="mr-2" /> Dashboards
          </Link>
          <Link to="/charts" className="flex items-center text-white" onClick={toggleMenu}>
            <FaChartBar className="mr-2" /> Charts
          </Link>
         

        </nav>
      </div>
    </div>
  );
};

export default Header;
