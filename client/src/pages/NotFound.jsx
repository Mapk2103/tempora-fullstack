import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="page-state">
    <span className="eyebrow">Error 404</span>
    <h1>This page does not exist</h1>
    <p>The address may have changed or the content may no longer be available.</p>
    <Link to="/" className="primary-link">Back to Home</Link>
  </main>
);

export default NotFound;
