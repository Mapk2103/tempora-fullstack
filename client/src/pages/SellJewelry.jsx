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

    return new Intl.DateTimeFormat('es-UY', {
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
    } catch (err) {
      setEstimatedValue(null);
      setSaveError(
        err.response?.data?.message || 'No se pudo calcular la cotización'
      );
    } finally {
      setEstimating(false);
    }
  };

  const handleSaveQuotation = async () => {
    if (!user.isLoggedIn) {
      setSaveError('Debes iniciar sesión para guardar una cotización');
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
      setSaveSuccess('Cotización guardada exitosamente. Nos contactaremos pronto.');
      setTimeout(() => {
        setFormData({ weight: '', purity: '18k', type: 'jewelry' });
        setEstimatedValue(null);
        setSaveSuccess('');
      }, 3000);
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Error al guardar cotización');
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
          <h2>Vender tu Oro</h2>
          <p>Obtén el mejor precio por tus joyas de oro. Evaluación profesional y pago inmediato.</p>
        </div>

        {/*precio del oro */}
        <div className="gold-price-info">
          <div className="gold-price-display">
            {goldLoading && !goldPrice ? (
              <div className="price-container">
                <span className="price-label">Cargando precio del oro...</span>
              </div>
            ) : (
              <>
                <div className="price-container">
                  <span className="price-label">Precio actual del oro:</span>
                  <span className="price-value">
                    {goldPrice ? `$${goldPrice.toFixed(2)}` : 'No disponible'}
                  </span>
                  {goldPrice && <span className="price-currency">USD/onza</span>}
                </div>
                <div className="last-updated">
                  {formattedGoldUpdatedAt
                    ? `Última actualización: ${formattedGoldUpdatedAt}`
                    : 'Precio actualizado automáticamente cada 30 segundos'}
                </div>
                {goldCached && (
                  <div className="last-updated">
                    Datos de mercado actualizados periódicamente
                  </div>
                )}
                {error && <div className="last-updated">{error}</div>}
              </>
            )}
          </div>
        </div>

        {/* Formulario de venta */}
        <div className="sell-form-container">
          <h3>Calculadora de Valor</h3>
          <form onSubmit={handleSubmit} className="sell-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Peso (en gramos)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0.1"
                  required
                  placeholder="Ej: 10.5"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="purity">Pureza del Oro</label>
                <select
                  id="purity"
                  name="purity"
                  value={formData.purity}
                  onChange={handleInputChange}
                >
                  <option value="24k">24K - Oro Puro</option>
                  <option value="18k">18K - Oro 75%</option>
                  <option value="14k">14K - Oro 58.5%</option>
                  <option value="10k">10K - Oro 41.7%</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Tipo de Artículo</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="jewelry">Joyería</option>
                <option value="coins">Monedas</option>
                <option value="bars">Lingotes</option>
              </select>
            </div>
            
            <button type="submit" className="submit-btn" disabled={estimating}>
              {estimating ? 'Calculando...' : 'Calcular Valor Estimado'}
            </button>
          </form>
          
          {saveError && <div className="error-message">{saveError}</div>}
          {saveSuccess && <div className="success-message">{saveSuccess}</div>}

          {estimatedValue && (
            <div className="estimated-value">
              <h4>Valor Estimado</h4>
              <div className="value-display">
                ${estimatedValue.toFixed(2)} USD
              </div>
              <small>*Este es un valor estimado. El precio final se determina tras una evaluación profesional.</small>
              <button
                onClick={handleSaveQuotation}
                className="save-quotation-btn"
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar Cotización'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellJewelry;
