const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(err.stack || err.message);
  } else {
    console.warn(err.message);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Algo salio mal en el servidor' : err.message,
    ...(process.env.NODE_ENV === 'development' && statusCode === 500
      ? { error: err.message }
      : {})
  });
};

module.exports = {
  errorHandler,
  notFound
};
