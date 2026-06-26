const pool = require('../db/pool');

const findByPostId = async (postId) => {
  const { rows } = await pool.query(`
    SELECT c.id, c.body, c.created_at,
           a.id AS author_id, a.name AS author_name
    FROM comments c
    JOIN authors a ON a.id = c.author_id
    WHERE c.post_id = $1
    ORDER BY c.id
  `, [postId]);
  return rows;
};

const create = async ({ body, post_id, author_id }) => {
  const { rows } = await pool.query(
    `INSERT INTO comments (body, post_id, author_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [body, post_id, author_id]
  );
  return rows[0];
};

const remove = async (id) => {
  const { rowCount } = await pool.query(
    'DELETE FROM comments WHERE id = $1',
    [id]
  );
  return rowCount > 0;
};

module.exports = { findByPostId, create, remove };
