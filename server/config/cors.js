const getAllowedOrigins = () => {
  const configuredOrigins = process.env.CORS_ORIGINS
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (configuredOrigins?.length) {
    return configuredOrigins;
  }

  if (process.env.NODE_ENV !== 'production') {
    return ['http://localhost:3500'];
  }

  return [];
};

const createCorsOptions = () => {
  const allowedOrigins = getAllowedOrigins();

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const error = new Error('Origen no permitido por CORS');
      error.statusCode = 403;
      return callback(error);
    },
    credentials: process.env.CORS_CREDENTIALS === 'true',
    optionsSuccessStatus: 204
  };
};

module.exports = createCorsOptions;
