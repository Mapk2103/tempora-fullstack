import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/assets/img/logo.png" alt="Logo de Témpora" />
              <h3>Témpora</h3>
            </div>
            <p>Elegancia atemporal en cada reloj. Descubrí la perfección del tiempo.</p>
          </div>
          
          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/vender-oro">Vender Oro</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contacto</h4>
            <ul>
              <li>📧 info@tempora.com</li>
              <li>📱 +00 00 0000-0000</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Témpora. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
