import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { productsAPI } from '../services/api';
import {
  handleProductImageError,
  resolveProductImage
} from '../utils/productImages';
import {
  getProductCategory,
  getProductDescription,
  getProductFeature
} from '../utils/productContent';
import '../components/css/product-detail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productsAPI.getOne(id);
      return response.data.product;
    },
    retry: false
  });

  if (isLoading) {
    return (
      <main className="page-state">
        <div className="state-spinner" aria-hidden="true" />
        <h1>Loading this piece</h1>
        <p>We are preparing all the details.</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page-state">
        <span className="eyebrow">The Témpora Collection</span>
        <h1>This piece is unavailable</h1>
        <p>The product may have changed or may no longer be part of the collection.</p>
        <div className="state-actions">
          <button type="button" onClick={() => refetch()}>Try Again</button>
          <Link to="/productos" className="primary-link">Back to Collection</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <Link to="/productos" className="back-link">← Back to Collection</Link>

      <article className="product-detail-card">
        <div className="product-detail-image">
          <img
            src={resolveProductImage(product.image)}
            onError={handleProductImageError}
            alt={product.name}
          />
        </div>

        <div className="product-detail-content">
          <span className="eyebrow">
            {getProductCategory(product.category)}
          </span>
          <h1>{product.name}</h1>
          <p className="product-detail-description">{getProductDescription(product)}</p>

          <div className="product-detail-meta">
            <div>
              <span>Price</span>
              <strong>${product.price.toLocaleString('en-US')} USD</strong>
            </div>
            <div>
              <span>Availability</span>
              <strong>{product.stock > 0 ? `${product.stock} available` : 'Sold Out'}</strong>
            </div>
          </div>

          {product.features?.length > 0 && (
            <div className="product-detail-features">
              <h2>Features</h2>
              <ul>
                {product.features.map((feature) => (
                  <li key={feature}>{getProductFeature(feature)}</li>
                ))}
              </ul>
            </div>
          )}

          <Link to="/productos" className="primary-link">
            Explore More Pieces
          </Link>
        </div>
      </article>
    </main>
  );
};

export default ProductDetail;
