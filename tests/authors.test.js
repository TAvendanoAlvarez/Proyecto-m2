jest.mock('../src/services/authors.service');

const request        = require('supertest');
const app            = require('../src/app');
const authorsService = require('../src/services/authors.service');

afterEach(() => jest.clearAllMocks());

const mockAuthor = { id: 1, name: 'Ana García', email: 'ana@example.com', bio: null, created_at: new Date() };

describe('GET /authors', () => {
  it('returns list of authors with 200', async () => {
    authorsService.findAll.mockResolvedValue([mockAuthor]);
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe('Ana García');
  });

  it('returns 500 on service error', async () => {
    authorsService.findAll.mockRejectedValue(new Error('DB error'));
    const res = await request(app).get('/authors');
    expect(res.status).toBe(500);
  });
});

describe('GET /authors/:id', () => {
  it('returns author when found', async () => {
    authorsService.findById.mockResolvedValue(mockAuthor);
    const res = await request(app).get('/authors/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('returns 404 when not found', async () => {
    authorsService.findById.mockResolvedValue(null);
    const res = await request(app).get('/authors/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Author not found');
  });
});

describe('POST /authors', () => {
  it('creates author and returns 201', async () => {
    authorsService.create.mockResolvedValue({ ...mockAuthor, id: 4 });
    const res = await request(app)
      .post('/authors')
      .send({ name: 'Luis', email: 'luis@example.com' });
    expect(res.status).toBe(201);
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app).post('/authors').send({ email: 'x@x.com' });
    expect(res.status).toBe(400);
  });

  it('returns 409 on duplicate email', async () => {
    const err = Object.assign(new Error('dup'), { code: '23505' });
    authorsService.create.mockRejectedValue(err);
    const res = await request(app).post('/authors').send({ name: 'Luis', email: 'ana@example.com' });
    expect(res.status).toBe(409);
  });
});

describe('PUT /authors/:id', () => {
  it('updates and returns author', async () => {
    authorsService.update.mockResolvedValue({ ...mockAuthor, name: 'Ana Updated' });
    const res = await request(app)
      .put('/authors/1')
      .send({ name: 'Ana Updated', email: 'ana@example.com' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Ana Updated');
  });

  it('returns 404 when not found', async () => {
    authorsService.update.mockResolvedValue(null);
    const res = await request(app).put('/authors/999').send({ name: 'X', email: 'x@x.com' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /authors/:id', () => {
  it('deletes and returns 204', async () => {
    authorsService.remove.mockResolvedValue(true);
    const res = await request(app).delete('/authors/1');
    expect(res.status).toBe(204);
  });

  it('returns 404 when not found', async () => {
    authorsService.remove.mockResolvedValue(false);
    const res = await request(app).delete('/authors/999');
    expect(res.status).toBe(404);
  });
});
