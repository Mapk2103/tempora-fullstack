import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { productsAPI } from '../services/api';
import {
  handleProductImageError,
  resolveProductImage
} from '../utils/productImages';
import '../components/css/home.css';

const formatPrice = (price) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}).format(price);

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsAPI.getAll();
      return response.data.products;
    }
  });

  const featuredProducts = (data || []).slice(0, 3);

  return (
    <main className="home-page">
      <Hero />

      <section className="home-intro section-shell">
        <span className="eyebrow">Alta relojería contemporánea</span>
        <h2>Diseñados para permanecer</h2>
        <p>
          Témpora reúne materiales nobles, líneas precisas y una presencia
          sobria en piezas creadas para acompañar generaciones.
        </p>
      </section>

      <section className="featured-section section-shell" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Selección Témpora</span>
            <h2 id="featured-title">Piezas destacadas</h2>
          </div>
          <Link to="/productos" className="text-link">
            Ver colección completa
          </Link>
        </div>

        <div className="featured-grid">
          {isLoading
            ? [1, 2, 3].map((item) => (
              <div className="featured-card featured-card-loading" key={item} />
            ))
            : featuredProducts.map((product) => (
              <article className="featured-card" key={product._id}>
                <Link to={`/productos/${product._id}`} className="featured-image-link">
                  <img
                    src={resolveProductImage(product.image)}
                    onError={handleProductImageError}
                    alt={product.name}
                    loading="lazy"
                  />
                </Link>
                <div className="featured-card-content">
                  <span className="featured-category">
                    {product.category.replaceAll('-', ' ')}
                  </span>
                  <h3>{product.name}</h3>
                  <div className="featured-card-footer">
                    <span>{formatPrice(product.price)}</span>
                    <Link to={`/productos/${product._id}`}>Descubrir</Link>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>

      <section className="brand-values">
        <div className="section-shell brand-values-grid">
          <article>
            <span>01</span>
            <h3>Selección cuidada</h3>
            <p>Una colección breve, coherente y centrada en piezas con carácter.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Materiales nobles</h3>
            <p>Oro, acero y acabados elegidos para conservar su presencia.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Atención personal</h3>
            <p>Acompañamiento claro antes y después de cada consulta.</p>
          </article>
        </div>
      </section>

      <section className="home-cta section-shell">
        <div>
          <span className="eyebrow">Tasación de metales preciosos</span>
          <h2>Conocé el valor estimado de tu oro</h2>
          <p>
            Calculá una referencia basada en la cotización de mercado y guardá
            tu solicitud de forma segura.
          </p>
        </div>
        <Link to="/vender-oro" className="primary-link">
          Cotizar ahora
        </Link>
      </section>
    </main>
  );
};

export default Home;
