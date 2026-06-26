const express = require('express');
const router  = express.Router();
const {
  getCommentsByPost, createComment, deleteComment,
} = require('../controllers/comments.controller');

// GET  /comments/post/:postId  — list comments for a post
// POST /comments               — create a comment
// DELETE /comments/:id         — delete a comment
router.get('/post/:postId', getCommentsByPost);
router.post('/',            createComment);
router.delete('/:id',       deleteComment);

module.exports = router;
