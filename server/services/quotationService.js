const GRAMS_PER_TROY_OUNCE = 31.1035;
const PAYOUT_RATE = 0.85;

const PURITY_MULTIPLIERS = {
  '24k': 1,
  '18k': 0.75,
  '14k': 0.585,
  '10k': 0.417
};

const VALID_TYPES = ['jewelry', 'coins', 'bars'];

const validateQuotationInput = ({ weight, purity, type }) => {
  const numericWeight = Number(weight);

  if (!Number.isFinite(numericWeight) || numericWeight < 0.1) {
    return {
      error: 'El peso debe ser un numero mayor o igual a 0.1 gramos'
    };
  }

  if (!Object.prototype.hasOwnProperty.call(PURITY_MULTIPLIERS, purity)) {
    return {
      error: 'La pureza seleccionada no es valida'
    };
  }

  if (!VALID_TYPES.includes(type)) {
    return {
      error: 'El tipo de articulo seleccionado no es valido'
    };
  }

  return {
    value: {
      weight: numericWeight,
      purity,
      type
    }
  };
};

const calculateEstimatedValue = ({ weight, purity, goldPrice }) => {
  const weightInOunces = weight / GRAMS_PER_TROY_OUNCE;
  const estimatedValue =
    weightInOunces * goldPrice * PURITY_MULTIPLIERS[purity] * PAYOUT_RATE;

  return Math.round(estimatedValue * 100) / 100;
};

module.exports = {
  calculateEstimatedValue,
  validateQuotationInput
};
