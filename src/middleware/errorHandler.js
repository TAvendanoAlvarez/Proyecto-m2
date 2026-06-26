// src/middleware/errorHandler.js
// Middleware global de manejo de errores.
// Debe registrarse ÚLTIMO en app.js (después de todas las rutas).

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;
