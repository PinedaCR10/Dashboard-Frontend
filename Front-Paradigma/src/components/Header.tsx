import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">
          Proyecto-Paradigmas
        </div>

        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/dashboards" className="nav-link">
            Dashboards
          </Link>
          <Link to="/graficos" className="nav-link">
            Transacciones
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
