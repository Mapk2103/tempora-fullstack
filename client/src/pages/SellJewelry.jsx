import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';
import { quotationsAPI } from '../services/api';

const SellJewelry = () => {
  const navigate = useNavigate();
  const {
    goldPrice,
    goldLoading,
    goldUpdatedAt,
    goldCached,
    error,
    user,
    fetchGoldPrice
  } = useUser();
  const [formData, setFormData] = useState({
    weight: '',
    purity: '18k',
    type: 'jewelry'
  });
  const [estimatedValue, setEstimatedValue] = useState(null);
  const [estimating, setEstimating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  useEffect(() => {
    let intervalId = null;

    const stopPolling = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const startPolling = (fetchImmediately = false) => {
      stopPolling();

      if (document.visibilityState === 'hidden') {
        return;
      }

      if (fetchImmediately) {
        fetchGoldPrice({ showLoading: true });
      }

      intervalId = window.setInterval(() => {
        if (document.visibilityState === 'visible') {
          fetchGoldPrice();
        }
      }, 30000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopPolling();
        return;
      }

      startPolling(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startPolling(true);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchGoldPrice]);

  const formatGoldUpdatedAt = () => {
    if (!goldUpdatedAt) {
      return null;
    }

    const updatedAt = new Date(goldUpdatedAt);

    if (Number.isNaN(updatedAt.getTime())) {
      return null;
    }

    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'medium'
    }).format(updatedAt);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setEstimatedValue(null);
    setSaveSuccess('');
    setSaveError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstimating(true);
    setSaveError('');
    setSaveSuccess('');

    try {
      const response = await quotationsAPI.estimate({
        weight: parseFloat(formData.weight),
        purity: formData.purity,
        type: formData.type
      });

      setEstimatedValue(response.data.estimate.estimatedValue);
    } catch {
      setEstimatedValue(null);
      setSaveError('We could not calculate your valuation. Please try again.');
    } finally {
      setEstimating(false);
    }
  };

  const handleSaveQuotation = async () => {
    if (!user.isLoggedIn) {
      setSaveError('Please log in to save a valuation');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setSaving(true);
    setSaveError('');
    setSaveSuccess('');

    try {
      const response = await quotationsAPI.create({
        weight: parseFloat(formData.weight),
        purity: formData.purity,
        type: formData.type
      });

      setEstimatedValue(response.data.quotation.estimatedValue);
      setSaveSuccess('Your valuation was saved successfully. We will contact you soon.');
      setTimeout(() => {
        setFormData({ weight: '', purity: '18k', type: 'jewelry' });
        setEstimatedValue(null);
        setSaveSuccess('');
      }, 3000);
    } catch {
      setSaveError('We could not save your valuation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formattedGoldUpdatedAt = formatGoldUpdatedAt();

  return (
    <div className="sell-jewelry-page">
      <div className="vender-oro-section">
        {}
        <div className="section-header">
          <h2>Sell Your Gold</h2>
          <p>Get a professional valuation for your gold jewelry with immediate pricing.</p>
        </div>

        {/* Gold price */}
        <div className="gold-price-info">
          <div className="gold-price-display">
            {goldLoading && !goldPrice ? (
              <div className="price-container">
                <span className="price-label">Loading gold price...</span>
              </div>
            ) : (
              <>
                <div className="price-container">
                  <span className="price-label">Current gold price:</span>
                  <span className="price-value">
                    {goldPrice ? `$${goldPrice.toFixed(2)}` : 'Unavailable'}
                  </span>
                  {goldPrice && <span className="price-currency">USD/ounce</span>}
                </div>
                <div className="last-updated">
                  {formattedGoldUpdatedAt
                    ? `Last updated: ${formattedGoldUpdatedAt}`
                    : 'Price updates automatically every 30 seconds'}
                </div>
                {goldCached && (
                  <div className="last-updated">
                    Market data is updated periodically
                  </div>
                )}
                {error && <div className="last-updated">{error}</div>}
              </>
            )}
          </div>
        </div>

        {/* Valuation form */}
        <div className="sell-form-container">
          <h3>Value Calculator</h3>
          <form onSubmit={handleSubmit} className="sell-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Weight (grams)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0.1"
                  required
                  placeholder="E.g. 10.5"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="purity">Gold Purity</label>
                <select
                  id="purity"
                  name="purity"
                  value={formData.purity}
                  onChange={handleInputChange}
                >
                  <option value="24k">24K - Pure Gold</option>
                  <option value="18k">18K - 75% Gold</option>
                  <option value="14k">14K - 58.5% Gold</option>
                  <option value="10k">10K - 41.7% Gold</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Item Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="jewelry">Jewelry</option>
                <option value="coins">Coins</option>
                <option value="bars">Gold Bars</option>
              </select>
            </div>
            
            <button type="submit" className="submit-btn" disabled={estimating}>
              {estimating ? 'Calculating...' : 'Calculate Estimated Value'}
            </button>
          </form>
          
          {saveError && <div className="error-message">{saveError}</div>}
          {saveSuccess && <div className="success-message">{saveSuccess}</div>}

          {estimatedValue && (
            <div className="estimated-value">
              <h4>Estimated Value</h4>
              <div className="value-display">
                ${estimatedValue.toFixed(2)} USD
              </div>
              <small>*This is an estimate. The final price is determined after a professional evaluation.</small>
              <button
                onClick={handleSaveQuotation}
                className="save-quotation-btn"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Valuation'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellJewelry;
