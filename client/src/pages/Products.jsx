import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import {
  handleProductImageError,
  resolveProductImage
} from '../utils/productImages';
import {
  getProductDescription,
  getProductFeature
} from '../utils/productContent';
import '../components/css/products.css';

const Products = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsAPI.getAll();
      return response.data.products;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const products = data || [];

  if (isLoading) {
    return (
      <main className="products-page">
        {[1, 2, 3].map((item) => (
          <div key={item} className="skeleton-container">
            <div className="skeleton-content">
              <div className="skeleton-title" />
              <div className="skeleton-text" />
              <div className="skeleton-text" />
              <div className="skeleton-text" />
              <div className="skeleton-price" />
              <div className="skeleton-button" />
            </div>
          </div>
        ))}
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-state">
        <span className="eyebrow">The Témpora Collection</span>
        <h1>We could not load the collection</h1>
        <p>Check your connection and try again.</p>
        <button type="button" onClick={() => refetch()}>Try Again</button>
      </main>
    );
  }

  return (
    <main className="products-page">
      <header className="products-header">
        <span className="eyebrow">The Témpora Collection</span>
        <h1>Watches with a presence of their own</h1>
        <p>
          A selection of contemporary pieces crafted to transcend seasons
          and trends.
        </p>
      </header>

      {products.length === 0 ? (
        <div className="no-products">
          <h2>No products are currently available</h2>
          <p>Visit again soon to discover the next additions to the collection.</p>
        </div>
      ) : (
        products.map((product, index) => (
          <section
            key={product._id}
            className={`product-showcase ${index % 2 ? 'product-showcase-reverse' : ''}`}
            style={{ '--product-image': `url("${resolveProductImage(product.image)}")` }}
          >
            <div className="product-mobile-image">
              <img
                src={resolveProductImage(product.image)}
                onError={handleProductImageError}
                alt={product.name}
                loading="lazy"
              />
            </div>

            <div className="product-showcase-inner">
              <div className="product-copy">
                <span className="product-index">
                  {String(index + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                </span>
                <h2>{product.name}</h2>
                <p>{getProductDescription(product)}</p>

                <div className="product-info">
                  <span className="price">
                    ${product.price.toLocaleString('en-US')}
                    <span className="currency">USD</span>
                  </span>
                  {product.stock > 0 ? (
                    <span className="stock available">In Stock ({product.stock})</span>
                  ) : (
                    <span className="stock unavailable">Sold Out</span>
                  )}
                </div>

                {product.features?.length > 0 && (
                  <ul className="product-features">
                    {product.features.map((feature) => (
                      <li key={feature}>{getProductFeature(feature)}</li>
                    ))}
                  </ul>
                )}

                <Link to={`/productos/${product._id}`} className="view-details">
                  View Details
                </Link>
              </div>
            </div>
          </section>
        ))
      )}
    </main>
  );
};

export default Products;
