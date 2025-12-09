import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/assets/img/logo.png" alt="Logo de Témpora" />
        </Link>

        <ul className="nav-links">
          <li>
            <Link
              to="/"
              className={isActive('/') ? 'active' : ''}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/productos"
              className={isActive('/productos') ? 'active' : ''}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              to="/vender-oro"
              className={isActive('/vender-oro') ? 'active' : ''}
            >
              Vender Oro
            </Link>
          </li>

          {user.isLoggedIn && (
            <li>
              <Link
                to="/mis-cotizaciones"
                className={isActive('/mis-cotizaciones') ? 'active' : ''}
              >
                Mis Cotizaciones
              </Link>
            </li>
          )}

          {user.isLoggedIn && user.role === 'admin' && (
            <li>
              <Link
                to="/admin"
                className={isActive('/admin') ? 'active' : ''}
              >
                Admin
              </Link>
            </li>
          )}

          {!user.isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  className={isActive('/login') ? 'active' : ''}
                >
                  Iniciar Sesión
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
              <button onClick={handleLogout} className="btn-logout">
                Cerrar Sesión ({user.name})
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
