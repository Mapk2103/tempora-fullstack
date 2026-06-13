const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const createCorsOptions = require('./config/cors');
const { errorHandler, notFound } = require('./middleware/error');

dotenv.config();

const app = express();

connectDB();

app.use(cors(createCorsOptions()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/quotations', require('./routes/quotations'));
app.use('/api/market', require('./routes/market'));

app.get('/', (req, res) => {
  res.json({
    message: 'API de Tempora - Tienda de Relojes de Oro',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      quotations: '/api/quotations',
      gold: '/api/market/gold'
    }
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
