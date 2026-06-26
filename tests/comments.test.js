jest.mock('../src/services/comments.service');

const request         = require('supertest');
const app             = require('../src/app');
const commentsService = require('../src/services/comments.service');

afterEach(() => jest.clearAllMocks());

const mockComment = {
  id: 1, body: 'Buen artículo', post_id: 1,
  author_id: 2, author_name: 'Carlos', created_at: new Date(),
};

describe('GET /comments/post/:postId', () => {
  it('returns comments for a post', async () => {
    commentsService.findByPostId.mockResolvedValue([mockComment]);
    const res = await request(app).get('/comments/post/1');
    expect(res.status).toBe(200);
    expect(res.body[0].body).toBe('Buen artículo');
  });
});

describe('POST /comments', () => {
  it('creates comment and returns 201', async () => {
    commentsService.create.mockResolvedValue(mockComment);
    const res = await request(app).post('/comments')
      .send({ body: 'Buen artículo', post_id: 1, author_id: 2 });
    expect(res.status).toBe(201);
  });

  it('returns 400 when body is missing', async () => {
    const res = await request(app).post('/comments')
      .send({ post_id: 1, author_id: 2 });
    expect(res.status).toBe(400);
  });

  it('returns 400 on FK violation', async () => {
    const err = Object.assign(new Error('fk'), { code: '23503' });
    commentsService.create.mockRejectedValue(err);
    const res = await request(app).post('/comments')
      .send({ body: 'X', post_id: 999, author_id: 1 });
    expect(res.status).toBe(400);
  });
});

describe('DELETE /comments/:id', () => {
  it('deletes and returns 204', async () => {
    commentsService.remove.mockResolvedValue(true);
    const res = await request(app).delete('/comments/1');
    expect(res.status).toBe(204);
  });

  it('returns 404 when not found', async () => {
    commentsService.remove.mockResolvedValue(false);
    const res = await request(app).delete('/comments/999');
    expect(res.status).toBe(404);
  });
});
