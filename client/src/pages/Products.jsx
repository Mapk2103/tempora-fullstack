import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../services/api';
import '../components/css/products.css';

const Products = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsAPI.getAll();
      return response.data.products;
    },
    staleTime: 5 * 60 * 1000,
  });

  const products = data || [];

  if (isLoading) {
    return (
      <div className="products-page">
        {/* Skeleton loaders para 3 productos */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="skeleton-container">
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-price"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="error-message">Error al cargar productos</div>
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
