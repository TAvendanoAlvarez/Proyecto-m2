-- ==============================================
-- setup.sql - Crear tablas y relaciones
-- ==============================================

DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS authors CASCADE;

-- Tabla: authors
CREATE TABLE authors (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  bio        TEXT,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_authors_email ON authors (email);

-- Tabla: posts
CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(200)  NOT NULL,
  content    TEXT          NOT NULL,
  published  BOOLEAN       NOT NULL DEFAULT FALSE,
  author_id  INTEGER       NOT NULL,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_posts_author
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

CREATE INDEX idx_posts_author_id ON posts (author_id);
CREATE INDEX idx_posts_published  ON posts (published);

-- Tabla: comments (extra credit)
CREATE TABLE comments (
  id         SERIAL PRIMARY KEY,
  body       TEXT          NOT NULL,
  post_id    INTEGER       NOT NULL,
  author_id  INTEGER       NOT NULL,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_comments_post
    FOREIGN KEY (post_id)   REFERENCES posts(id)   ON DELETE CASCADE,
  CONSTRAINT fk_comments_author
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_post_id   ON comments (post_id);
CREATE INDEX idx_comments_author_id ON comments (author_id);
