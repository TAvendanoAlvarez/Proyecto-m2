const commentsService = require('../services/comments.service');

const getCommentsByPost = async (req, res, next) => {
  try {
    res.json(await commentsService.findByPostId(req.params.postId));
  } catch (err) { next(err); }
};

const createComment = async (req, res, next) => {
  try {
    const { body, post_id, author_id } = req.body;
    if (!body || !post_id || !author_id) {
      return res.status(400).json({ error: 'body, post_id and author_id are required' });
    }
    const comment = await commentsService.create({ body, post_id, author_id });
    res.status(201).json(comment);
  } catch (err) {
    if (err.code === '23503') return res.status(400).json({ error: 'post_id or author_id does not exist' });
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const deleted = await commentsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Comment not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { getCommentsByPost, createComment, deleteComment };
