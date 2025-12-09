const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Tempus Aurfus',
    description: 'Donde el tiempo vale oro. Un homenaje al resplandor y la grandeza. TEMPUS AURFUS deslumbra con su acabado dorado integral, fusionando la precisión relojera con una estética imperial. No marca la hora: la consagra.',
    price: 12500.00,
    image: '/assets/img/reloj1.jpg',
    category: 'reloj-oro',
    stock: 5,
    features: ['Oro 18K', 'Resistente al agua', 'Movimiento suizo', 'Garantía 5 años']
  },
  {
    name: 'PENJAURA',
    description: 'El poder del tiempo, esculpido en acero. PENJAURA impone con su presencia silenciosa y su esfera de textura fracturada, que evoca la solidez del mármol y la eternidad del tiempo. Diseñado para quienes no necesitan brillar: dominan.',
    price: 8900.00,
    image: '/assets/img/reloj2.jpg',
    category: 'reloj-acero',
    stock: 8,
    features: ['Acero inoxidable', 'Esfera de mármol', 'Cronógrafo', 'Resistente a rayones']
  },
  {
    name: 'GELLER',
    description: 'Diseño clásico, esencia contemporánea. Un reloj que encarna la sobriedad del oro y la precisión del tiempo. GELLER combina estética y funcionalidad en una pieza creada para perdurar.',
    price: 15800.00,
    image: '/assets/img/reloj3.jpg',
    category: 'reloj-clasico',
    stock: 3,
    features: ['Oro 24K', 'Diseño minimalista', 'Mecanismo automático', 'Edición limitada']
  }
];

const seedDatabase = async () => {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    console.log('Eliminando productos existentes...');
    await Product.deleteMany({});
    console.log('✅ Productos eliminados');

    console.log('Insertando productos de ejemplo...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ ${products.length} productos insertados exitosamente:`);

    products.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - $${product.price}`);
    });

    console.log('\n🎉 ¡Base de datos poblada exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
