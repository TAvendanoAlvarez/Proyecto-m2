-- ==============================================
-- seed.sql - Datos de prueba
-- ==============================================

TRUNCATE TABLE comments RESTART IDENTITY CASCADE;
TRUNCATE TABLE posts    RESTART IDENTITY CASCADE;
TRUNCATE TABLE authors  RESTART IDENTITY CASCADE;

INSERT INTO authors (name, email, bio) VALUES
  ('Ana García',    'ana@example.com',    'Desarrolladora full-stack apasionada por Node.js'),
  ('Carlos Ruiz',   'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
  ('María López',   'maria@example.com',  'Ingeniera de software con foco en APIs REST');

INSERT INTO posts (title, content, author_id, published) VALUES
  ('Introducción a Node.js',       'Node.js es un runtime de JavaScript...',         1, TRUE),
  ('PostgreSQL vs MySQL',           'Ambas bases de datos tienen ventajas...',         2, TRUE),
  ('APIs RESTful',                  'REST es un estilo arquitectónico...',             1, TRUE),
  ('Manejo de errores en Express',  'El manejo apropiado de errores...',               3, FALSE),
  ('Async/Await explicado',         'Las promesas simplifican el código asíncrono...',  1, FALSE);

INSERT INTO comments (body, post_id, author_id) VALUES
  ('Excelente artículo, muy claro.',   1, 2),
  ('Me ayudó mucho, gracias.',          1, 3),
  ('Muy buen comparativo.',             2, 1),
  ('Justo lo que necesitaba leer.',     3, 2);
