const pool = require('../db/pool');

const findAll = async () => {
  const { rows } = await pool.query(
    'SELECT id, name, email, bio, created_at FROM authors ORDER BY id'
  );
  return rows;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, bio, created_at FROM authors WHERE id = $1',
    [id]
  );
  return rows[0] || null;
};

const create = async ({ name, email, bio }) => {
  const { rows } = await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
    [name, email, bio || null]
  );
  return rows[0];
};

const update = async (id, { name, email, bio }) => {
  const { rows } = await pool.query(
    `UPDATE authors SET name = $1, email = $2, bio = $3
     WHERE id = $4 RETURNING *`,
    [name, email, bio || null, id]
  );
  return rows[0] || null;
};

const remove = async (id) => {
  const { rowCount } = await pool.query(
    'DELETE FROM authors WHERE id = $1',
    [id]
  );
  return rowCount > 0;
};

module.exports = { findAll, findById, create, update, remove };
