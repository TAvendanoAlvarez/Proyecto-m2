const postsService = require('../services/posts.service');

const getAllPosts = async (req, res, next) => {
  try {
    res.json(await postsService.findAll());
  } catch (err) { next(err); }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await postsService.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
};

const getPostsByAuthor = async (req, res, next) => {
  try {
    res.json(await postsService.findByAuthorId(req.params.authorId));
  } catch (err) { next(err); }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, published, author_id } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'title, content and author_id are required' });
    }
    const post = await postsService.create({ title, content, published, author_id });
    res.status(201).json(post);
  } catch (err) {
    if (err.code === '23503') return res.status(400).json({ error: 'author_id does not exist' });
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content, published, author_id } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'title, content and author_id are required' });
    }
    const post = await postsService.update(req.params.id, { title, content, published, author_id });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    if (err.code === '23503') return res.status(400).json({ error: 'author_id does not exist' });
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deleted = await postsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { getAllPosts, getPostById, getPostsByAuthor, createPost, updatePost, deletePost };
