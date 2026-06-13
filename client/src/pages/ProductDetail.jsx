import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { productsAPI } from '../services/api';
import {
  handleProductImageError,
  resolveProductImage
} from '../utils/productImages';
import '../components/css/product-detail.css';

const categoryNames = {
  'reloj-oro': 'Reloj de oro',
  'reloj-acero': 'Reloj de acero',
  'reloj-clasico': 'Reloj clásico',
  'reloj-deportivo': 'Reloj deportivo'
};

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
        <h1>Cargando pieza</h1>
        <p>Estamos preparando todos los detalles.</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page-state">
        <span className="eyebrow">Colección Témpora</span>
        <h1>La pieza no está disponible</h1>
        <p>Es posible que el producto haya cambiado o ya no forme parte del catálogo.</p>
        <div className="state-actions">
          <button type="button" onClick={() => refetch()}>Reintentar</button>
          <Link to="/productos" className="primary-link">Volver al catálogo</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <Link to="/productos" className="back-link">← Volver al catálogo</Link>

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
            {categoryNames[product.category] || product.category}
          </span>
          <h1>{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-meta">
            <div>
              <span>Precio</span>
              <strong>${product.price.toLocaleString('en-US')} USD</strong>
            </div>
            <div>
              <span>Disponibilidad</span>
              <strong>{product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}</strong>
            </div>
          </div>

          {product.features?.length > 0 && (
            <div className="product-detail-features">
              <h2>Características</h2>
              <ul>
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <Link to="/productos" className="primary-link">
            Explorar más piezas
          </Link>
        </div>
      </article>
    </main>
  );
};

export default ProductDetail;
