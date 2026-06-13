import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="hero-section">
    <div className="hero-overlay">
      <div className="hero-content">
        <span className="hero-eyebrow">Témpora · Alta relojería</span>
        <h1>Elegancia atemporal</h1>
        <p>Relojes de carácter, concebidos para trascender el tiempo.</p>
        <Link to="/productos" className="hero-button">Ver catálogo</Link>
      </div>
    </div>
  </section>
);

export default Hero;
