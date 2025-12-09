import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';
import { quotationsAPI } from '../services/api';

const SellJewelry = () => {
  const navigate = useNavigate();
  const { goldPrice, loading, error, user } = useUser();
  const [formData, setFormData] = useState({
    weight: '',
    purity: '18k',
    type: 'jewelry'
  });
  const [estimatedValue, setEstimatedValue] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  const calculateValue = () => {
    if (!goldPrice || !formData.weight) return null;

    const weightInGrams = parseFloat(formData.weight);
    const weightInOunces = weightInGrams / 31.1035;

    const purityMultiplier = {
      '24k': 1.0,
      '18k': 0.75,
      '14k': 0.585,
      '10k': 0.417
    };

    const multiplier = purityMultiplier[formData.purity] || 0.75;
    const calculatedValue = weightInOunces * goldPrice * multiplier * 0.85;

    return calculatedValue;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = calculateValue();
    setEstimatedValue(value);
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
      await quotationsAPI.create({
        weight: parseFloat(formData.weight),
        purity: formData.purity,
        type: formData.type,
        goldPrice: goldPrice,
        estimatedValue: estimatedValue
      });

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
            {loading ? (
              <div className="price-container">
                <span className="price-label">Cargando precio del oro...</span>
              </div>
            ) : error ? (
              <div className="price-container">
                <span className="price-label">Precio del oro:</span>
                <span className="price-value">$3389.30</span>
                <span className="price-currency">USD</span>
              </div>
            ) : (
              <>
                <div className="price-container">
                  <span className="price-label">Precio actual del oro:</span>
                  <span className="price-value">${goldPrice?.toFixed(2)}</span>
                  <span className="price-currency">USD/onza</span>
                </div>
                <div className="last-updated">
                  Actualizado en tiempo real
                </div>
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
            
            <button type="submit" className="submit-btn">
              Calcular Valor Estimado
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
