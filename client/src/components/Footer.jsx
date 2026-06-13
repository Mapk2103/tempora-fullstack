import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/img/logo.png';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logoImg} alt="Logo de Témpora" />
            <h3>Témpora</h3>
          </div>
          <p>Elegancia atemporal en cada pieza. Precisión, carácter y permanencia.</p>
        </div>

        <div className="footer-section">
          <h4>Explorar</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/vender-oro">Vender oro</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul>
            <li><a href="mailto:info@tempora.com">info@tempora.com</a></li>
            <li>Atención online · Montevideo, Uruguay</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Témpora. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
