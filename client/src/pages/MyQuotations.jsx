import React, { useState, useEffect } from 'react';
import { quotationsAPI } from '../services/api';
import '../components/css/quotations.css';

const MyQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const response = await quotationsAPI.getMyQuotations();
      setQuotations(response.data.quotations);
    } catch (err) {
      setError('Error al cargar cotizaciones');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Pendiente', class: 'status-pending' },
      reviewed: { text: 'Revisada', class: 'status-reviewed' },
      approved: { text: 'Aprobada', class: 'status-approved' },
      rejected: { text: 'Rechazada', class: 'status-rejected' },
      completed: { text: 'Completada', class: 'status-completed' }
    };
    return statusMap[status] || { text: status, class: 'status-pending' };
  };

  const getTypeName = (type) => {
    const typeMap = {
      jewelry: 'Joyería',
      coins: 'Monedas',
      bars: 'Lingotes'
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return <div className="loading">Cargando cotizaciones...</div>;
  }

  return (
    <div className="quotations-container">
      <h1>Mis Cotizaciones</h1>

      {error && <div className="error-message">{error}</div>}

      {quotations.length === 0 ? (
        <div className="no-quotations">
          <h2>No tienes cotizaciones guardadas</h2>
          <p>Realiza una cotización en la sección de Vender Oro</p>
        </div>
      ) : (
        <div className="quotations-grid">
          {quotations.map((quotation) => (
            <div key={quotation._id} className="quotation-card">
              <div className="quotation-header">
                <span className={`status-badge ${getStatusBadge(quotation.status).class}`}>
                  {getStatusBadge(quotation.status).text}
                </span>
                <span className="quotation-date">
                  {new Date(quotation.createdAt).toLocaleDateString('es-ES')}
                </span>
              </div>

              <div className="quotation-details">
                <div className="detail-row">
                  <span className="label">Tipo:</span>
                  <span className="value">{getTypeName(quotation.type)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Peso:</span>
                  <span className="value">{quotation.weight}g</span>
                </div>
                <div className="detail-row">
                  <span className="label">Pureza:</span>
                  <span className="value">{quotation.purity}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Precio del Oro:</span>
                  <span className="value">${quotation.goldPrice.toFixed(2)}/oz</span>
                </div>
              </div>

              <div className="quotation-value">
                <span className="value-label">Valor Estimado:</span>
                <span className="value-amount">${quotation.estimatedValue.toFixed(2)}</span>
              </div>

              {quotation.adminNotes && (
                <div className="admin-notes">
                  <strong>Notas del Administrador:</strong>
                  <p>{quotation.adminNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQuotations;
