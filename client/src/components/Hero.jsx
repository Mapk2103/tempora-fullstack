import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleVerCatalogo = () => {
    navigate('/productos');
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Elegancia Atemporal</h1>
          <p>Descubrí relojes que trascienden el tiempo</p>
          <a 
            href="#featured-products-component" 
            className="hero-button"
            onClick={handleVerCatalogo}
          >
            Ver Catálogo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
