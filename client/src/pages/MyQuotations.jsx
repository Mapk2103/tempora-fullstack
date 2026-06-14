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
      setError('Unable to load your valuations');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Pending', class: 'status-pending' },
      reviewed: { text: 'Reviewed', class: 'status-reviewed' },
      approved: { text: 'Approved', class: 'status-approved' },
      rejected: { text: 'Rejected', class: 'status-rejected' },
      completed: { text: 'Completed', class: 'status-completed' }
    };
    return statusMap[status] || { text: status, class: 'status-pending' };
  };

  const getTypeName = (type) => {
    const typeMap = {
      jewelry: 'Jewelry',
      coins: 'Coins',
      bars: 'Gold Bars'
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return <div className="loading">Loading valuations...</div>;
  }

  return (
    <div className="quotations-container">
      <h1>My Valuations</h1>

      {error && <div className="error-message">{error}</div>}

      {quotations.length === 0 ? (
        <div className="no-quotations">
          <h2>You have no saved valuations</h2>
          <p>Create a valuation from the Sell Gold page.</p>
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
                  {new Date(quotation.createdAt).toLocaleDateString('en-US')}
                </span>
              </div>

              <div className="quotation-details">
                <div className="detail-row">
                  <span className="label">Type:</span>
                  <span className="value">{getTypeName(quotation.type)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Weight:</span>
                  <span className="value">{quotation.weight}g</span>
                </div>
                <div className="detail-row">
                  <span className="label">Purity:</span>
                  <span className="value">{quotation.purity}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Gold Price:</span>
                  <span className="value">${quotation.goldPrice.toFixed(2)}/oz</span>
                </div>
              </div>

              <div className="quotation-value">
                <span className="value-label">Estimated Value:</span>
                <span className="value-amount">${quotation.estimatedValue.toFixed(2)}</span>
              </div>

              {quotation.adminNotes && (
                <div className="admin-notes">
                  <strong>Administrator Notes:</strong>
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
