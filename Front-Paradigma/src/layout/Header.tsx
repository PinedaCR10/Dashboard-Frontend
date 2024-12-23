import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSignInAlt, FaHome, FaTachometerAlt, FaChartBar } from 'react-icons/fa';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);



  const goToLogin = () => {
    const rutaLogin = "https://eshop-loggin.vercel.app/"; 
    const rutaFront = "https://dashboard-frontend-kohl.vercel.app/"; 
    window.location.href = `${rutaLogin}/?redirect=${encodeURIComponent(rutaFront)}`;
  };
 
  return (
    <div className="relative flex justify-between items-center p-4 bg-blue-950 shadow-md">
      <button className="text-3xl text-white z-20" onClick={toggleMenu}>
        <FaBars />
      </button>

      <button
        className="text-white text-2xl z-20"
        onClick={goToLogin}
      >
        <FaSignInAlt />
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
