import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="page-state">
    <span className="eyebrow">Error 404</span>
    <h1>Esta página no existe</h1>
    <p>La dirección puede haber cambiado o el contenido ya no está disponible.</p>
    <Link to="/" className="primary-link">Volver al inicio</Link>
  </main>
);

export default NotFound;
