import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';
import logoImg from '../../assets/img/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo" aria-label="Témpora, inicio">
          <img src={logoImg} alt="Logo de Témpora" />
        </Link>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul
          id="primary-navigation"
          className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}
        >
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Inicio</Link></li>
          <li>
            <Link
              to="/productos"
              className={location.pathname.startsWith('/productos') ? 'active' : ''}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link to="/vender-oro" className={isActive('/vender-oro') ? 'active' : ''}>
              Vender oro
            </Link>
          </li>

          {user.isLoggedIn && (
            <li>
              <Link
                to="/mis-cotizaciones"
                className={isActive('/mis-cotizaciones') ? 'active' : ''}
              >
                Mis cotizaciones
              </Link>
            </li>
          )}

          {user.isLoggedIn && user.role === 'admin' && (
            <li><Link to="/admin" className={isActive('/admin') ? 'active' : ''}>Admin</Link></li>
          )}

          {!user.isLoggedIn ? (
            <>
              <li>
                <Link to="/login" className={isActive('/login') ? 'active' : ''}>
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link
                  to="/registro"
                  className={`${isActive('/registro') ? 'active' : ''} btn-register`}
                >
                  Registrarse
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button type="button" onClick={handleLogout} className="btn-logout">
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
