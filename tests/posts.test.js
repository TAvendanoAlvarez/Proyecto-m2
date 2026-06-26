jest.mock('../src/services/posts.service');

const request      = require('supertest');
const app          = require('../src/app');
const postsService = require('../src/services/posts.service');

afterEach(() => jest.clearAllMocks());

const mockPost = {
  id: 1, title: 'Intro a Node.js', content: 'Node.js es...', published: true,
  author_id: 1, author_name: 'Ana García', created_at: new Date(), updated_at: new Date(),
};

describe('GET /posts', () => {
  it('returns list of posts', async () => {
    postsService.findAll.mockResolvedValue([mockPost]);
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body[0].title).toBe('Intro a Node.js');
  });
});

describe('GET /posts/:id', () => {
  it('returns post when found', async () => {
    postsService.findById.mockResolvedValue(mockPost);
    const res = await request(app).get('/posts/1');
    expect(res.status).toBe(200);
  });

  it('returns 404 when not found', async () => {
    postsService.findById.mockResolvedValue(null);
    const res = await request(app).get('/posts/999');
    expect(res.status).toBe(404);
  });
});

describe('GET /posts/author/:authorId', () => {
  it('returns posts for a given author', async () => {
    postsService.findByAuthorId.mockResolvedValue([mockPost]);
    const res = await request(app).get('/posts/author/1');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /posts', () => {
  it('creates post and returns 201', async () => {
    postsService.create.mockResolvedValue({ ...mockPost, id: 6 });
    const res = await request(app).post('/posts')
      .send({ title: 'Nuevo', content: 'Contenido', author_id: 1 });
    expect(res.status).toBe(201);
  });

  it('returns 400 when fields are missing', async () => {
    const res = await request(app).post('/posts').send({ title: 'Solo título' });
    expect(res.status).toBe(400);
  });

  it('returns 400 on FK violation (author_id inexistente)', async () => {
    const err = Object.assign(new Error('fk'), { code: '23503' });
    postsService.create.mockRejectedValue(err);
    const res = await request(app).post('/posts')
      .send({ title: 'Post', content: 'X', author_id: 999 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('author_id does not exist');
  });
});

describe('PUT /posts/:id', () => {
  it('updates and returns post', async () => {
    postsService.update.mockResolvedValue({ ...mockPost, title: 'Actualizado' });
    const res = await request(app).put('/posts/1')
      .send({ title: 'Actualizado', content: 'X', author_id: 1 });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Actualizado');
  });

  it('returns 404 when post does not exist', async () => {
    postsService.update.mockResolvedValue(null);
    const res = await request(app).put('/posts/999')
      .send({ title: 'X', content: 'Y', author_id: 1 });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /posts/:id', () => {
  it('deletes and returns 204', async () => {
    postsService.remove.mockResolvedValue(true);
    const res = await request(app).delete('/posts/1');
    expect(res.status).toBe(204);
  });

  it('returns 404 when not found', async () => {
    postsService.remove.mockResolvedValue(false);
    const res = await request(app).delete('/posts/999');
    expect(res.status).toBe(404);
  });
});
