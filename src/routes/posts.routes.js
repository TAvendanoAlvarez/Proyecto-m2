const express = require('express');
const router  = express.Router();
const {
  getAllPosts, getPostById, getPostsByAuthor,
  createPost, updatePost, deletePost,
} = require('../controllers/posts.controller');

// IMPORTANT: /author/:authorId must be declared BEFORE /:id
// so Express doesn't treat "author" as a numeric id.
router.get('/author/:authorId', getPostsByAuthor);

router.get('/',       getAllPosts);
router.get('/:id',    getPostById);
router.post('/',      createPost);
router.put('/:id',    updatePost);
router.delete('/:id', deletePost);

module.exports = router;
