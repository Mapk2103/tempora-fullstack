import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="hero-section">
    <div className="hero-overlay">
      <div className="hero-content">
        <span className="hero-eyebrow">Témpora · Fine Watchmaking</span>
        <h1>Timeless elegance</h1>
        <p>Distinctive watches designed to transcend time.</p>
        <Link to="/productos" className="hero-button">View Collection</Link>
      </div>
    </div>
  </section>
);

export default Hero;
