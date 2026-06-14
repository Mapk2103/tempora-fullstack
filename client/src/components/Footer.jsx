import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/img/logo.png';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logoImg} alt="Témpora logo" />
            <h3>Témpora</h3>
          </div>
          <p>Timeless elegance in every piece. Precision, character and permanence.</p>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/productos">Products</Link></li>
            <li><Link to="/vender-oro">Sell Gold</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@tempora.com">info@tempora.com</a></li>
            <li>Online service · Montevideo, Uruguay</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Témpora. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
