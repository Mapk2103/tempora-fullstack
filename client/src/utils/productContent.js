const categoryNames = {
  'reloj-oro': 'Gold Watch',
  'reloj-acero': 'Steel Watch',
  'reloj-clasico': 'Classic Watch',
  'reloj-deportivo': 'Sport Watch'
};

const descriptions = {
  'Tempus Aurfus': 'Where time is worth its weight in gold. A tribute to brilliance and grandeur, TEMPUS AURFUS pairs a full gold finish with precise watchmaking and an unmistakably regal presence.',
  PENJAURA: 'The power of time, sculpted in steel. PENJAURA combines a quiet presence with a fractured-texture dial inspired by marble, creating a refined statement of strength and permanence.',
  GELLER: 'Classic design with a contemporary spirit. GELLER balances the understated elegance of gold with precise engineering in a timeless piece made to endure.'
};

const featureNames = {
  'Oro 18K': '18K Gold',
  'Resistente al agua': 'Water Resistant',
  'Movimiento suizo': 'Swiss Movement',
  'Garantía 5 años': '5-Year Warranty',
  'Acero inoxidable': 'Stainless Steel',
  'Esfera de mármol': 'Marble-Texture Dial',
  Cronógrafo: 'Chronograph',
  'Resistente a rayones': 'Scratch Resistant',
  'Oro 24K': '24K Gold',
  'Diseño minimalista': 'Minimalist Design',
  'Mecanismo automático': 'Automatic Movement',
  'Edición limitada': 'Limited Edition'
};

export const getProductCategory = (category) => (
  categoryNames[category]
  || category?.replaceAll('-', ' ')
  || 'Watch'
);

export const getProductDescription = (product) => (
  descriptions[product.name] || product.description
);

export const getProductFeature = (feature) => (
  featureNames[feature] || feature
);
