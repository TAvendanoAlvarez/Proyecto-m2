const express       = require('express');
const cors          = require('cors');
const YAML          = require('yamljs');
const swaggerUi     = require('swagger-ui-express');
const path          = require('path');
const errorHandler  = require('./middleware/errorHandler');

const authorsRoutes  = require('./routes/authors.routes');
const postsRoutes    = require('./routes/posts.routes');
const commentsRoutes = require('./routes/comments.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI
try {
  const swaggerDoc = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
} catch (_) { /* silencioso en tests */ }

// Routes
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/authors',  authorsRoutes);
app.use('/posts',    postsRoutes);
app.use('/comments', commentsRoutes);

// 404
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
