import  { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; 
import { FaHome, FaChartBar, FaMoneyCheckAlt } from 'react-icons/fa'; 

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <button
          className="text-3xl text-white bg-blue-950 px-4 py-2 rounded-md transition ease-in-out duration-300 hover:bg-blue-700"
          onClick={toggleMenu}
        >
          <FaBars /> 
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-950 shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-start mt-20 space-y-8 p-4">
          <Link
            to="/"
            className={`text-white text-lg flex items-center w-full py-3 transition ease-in-out duration-300 hover:text-zinc-200 ${
              location.pathname === '/' ? 'bg-blue-800' : ''
            }`}
            onClick={toggleMenu} 
          >
            <FaHome className="mr-3" /> Home
          </Link>

          <Link
            to="/dashboards"
            className={`text-white text-lg flex items-center w-full py-3 transition ease-in-out duration-300 hover:text-zinc-200 ${
              location.pathname === '/dashboards' ? 'bg-blue-800' : ''
            }`}
            onClick={toggleMenu} 
          >
            <FaChartBar className="mr-3" /> Dashboards
          </Link>

          <Link
            to="/charts"
            className={`text-white text-lg flex items-center w-full py-3 transition ease-in-out duration-300 hover:text-zinc-200 ${
              location.pathname === '/charts' ? 'bg-blue-800' : ''
            }`}
            onClick={toggleMenu} 
          >
            <FaMoneyCheckAlt className="mr-3" /> Transactions
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
