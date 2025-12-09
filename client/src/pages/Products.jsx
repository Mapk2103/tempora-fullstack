import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import '../components/css/products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.products);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-message">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {products.length === 0 ? (
        <div className="no-products">
          <h2>No hay productos disponibles</h2>
          <p>Vuelve pronto para ver nuestros increíbles relojes</p>
        </div>
      ) : (
        products.map((product, index) => (
          <section key={product._id} className={`reloj-section${index > 0 ? index + 1 : ''}`}>
            <div className="reloj-contenido">
              <div className="texto">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <br />
                <div className="product-info">
                  <span className="price">${product.price.toFixed(2)} <span className="currency">USD</span></span>
                  {product.stock > 0 ? (
                    <span className="stock available">En Stock ({product.stock})</span>
                  ) : (
                    <span className="stock unavailable">Agotado</span>
                  )}
                </div>
                {product.features && product.features.length > 0 && (
                  <ul className="product-features">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                )}
                <button className="view-details">Ver Detalles</button>
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Products;
