const pool = require('../db/pool');

const findAll = async () => {
  const { rows } = await pool.query(`
    SELECT p.id, p.title, p.content, p.published, p.created_at, p.updated_at,
           a.id AS author_id, a.name AS author_name, a.email AS author_email
    FROM posts p
    JOIN authors a ON a.id = p.author_id
    ORDER BY p.id
  `);
  return rows;
};

const findById = async (id) => {
  const { rows } = await pool.query(`
    SELECT p.id, p.title, p.content, p.published, p.created_at, p.updated_at,
           a.id AS author_id, a.name AS author_name, a.email AS author_email
    FROM posts p
    JOIN authors a ON a.id = p.author_id
    WHERE p.id = $1
  `, [id]);
  return rows[0] || null;
};

// GET /posts/author/:authorId  — posts with full author detail
const findByAuthorId = async (authorId) => {
  const { rows } = await pool.query(`
    SELECT p.id, p.title, p.content, p.published, p.created_at, p.updated_at,
           a.id AS author_id, a.name AS author_name, a.email AS author_email, a.bio AS author_bio
    FROM posts p
    JOIN authors a ON a.id = p.author_id
    WHERE p.author_id = $1
    ORDER BY p.id
  `, [authorId]);
  return rows;
};

const create = async ({ title, content, published = false, author_id }) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, published, author_id)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, content, published, author_id]
  );
  return rows[0];
};

const update = async (id, { title, content, published, author_id }) => {
  const { rows } = await pool.query(
    `UPDATE posts
     SET title = $1, content = $2, published = $3, author_id = $4, updated_at = NOW()
     WHERE id = $5 RETURNING *`,
    [title, content, published ?? false, author_id, id]
  );
  return rows[0] || null;
};

const remove = async (id) => {
  const { rowCount } = await pool.query(
    'DELETE FROM posts WHERE id = $1',
    [id]
  );
  return rowCount > 0;
};

module.exports = { findAll, findById, findByAuthorId, create, update, remove };
