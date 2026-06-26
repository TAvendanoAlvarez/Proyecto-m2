const authorsService = require('../services/authors.service');

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await authorsService.findAll();
    res.json(authors);
  } catch (err) { next(err); }
};

const getAuthorById = async (req, res, next) => {
  try {
    const author = await authorsService.findById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) { next(err); }
};

const createAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });

    const author = await authorsService.create({ name, email, bio });
    res.status(201).json(author);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already exists' });
    next(err);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });

    const author = await authorsService.update(req.params.id, { name, email, bio });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already exists' });
    next(err);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const deleted = await authorsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Author not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
