# Blog API

REST API for managing **authors**, **posts**, and **comments**.  
Built with **Node.js + Express + PostgreSQL**, tested with **Jest + Supertest**, documented with **OpenAPI/Swagger**, deployed on **Railway**.

---

## Tech stack

- Node.js + Express — server and routing
- PostgreSQL + pg — database
- Jest + Supertest — unit tests (no real DB needed)
- Swagger UI — interactive docs at `/docs`
- Railway — cloud deployment

---

## Requirements

- Node.js ≥ 18
- PostgreSQL ≥ 14
- npm ≥ 9

---

## Local setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USER/blog-api.git
cd blog-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 4. Create the database

```bash
psql -U postgres -c "CREATE DATABASE blog_api;"
```

### 5. Run SQL scripts

```bash
# Create tables and indexes
psql -U postgres -d blog_api -f sql/setup.sql

# Insert sample data
psql -U postgres -d blog_api -f sql/seed.sql
```

### 6. Start the server

```bash
npm run dev    # development (hot-reload with nodemon)
npm start      # production
```

Server → `http://localhost:3000`  
Swagger UI → `http://localhost:3000/docs`

---

## Run tests

Tests use mocks — **no database connection required**.

```bash
npm test

# With coverage report
npm run test:coverage
```

---

## API Endpoints

### Authors

| Method | Route          | Description              |
|--------|----------------|--------------------------|
| GET    | /authors       | List all authors         |
| GET    | /authors/:id   | Get author by ID         |
| POST   | /authors       | Create author            |
| PUT    | /authors/:id   | Update author            |
| DELETE | /authors/:id   | Delete author (cascades) |

### Posts

| Method | Route                    | Description                       |
|--------|--------------------------|-----------------------------------|
| GET    | /posts                   | List all posts (with author info) |
| GET    | /posts/:id               | Get post by ID                    |
| GET    | /posts/author/:authorId  | Posts by author (with author detail) |
| POST   | /posts                   | Create post                       |
| PUT    | /posts/:id               | Update post                       |
| DELETE | /posts/:id               | Delete post (cascades comments)   |

### Comments *(extra credit)*

| Method | Route                    | Description              |
|--------|--------------------------|--------------------------|
| GET    | /comments/post/:postId   | List comments for a post |
| POST   | /comments                | Create comment           |
| DELETE | /comments/:id            | Delete comment           |

---

## OpenAPI Documentation

The spec is at `docs/openapi.yaml`.

When running locally, Swagger UI is available at:

```
http://localhost:3000/docs
```

---

## Database schema

```
authors
  id          SERIAL PK
  name        VARCHAR(100)  NOT NULL
  email       VARCHAR(150)  NOT NULL UNIQUE
  bio         TEXT
  created_at  TIMESTAMPTZ

posts
  id          SERIAL PK
  title       VARCHAR(200)  NOT NULL
  content     TEXT          NOT NULL
  published   BOOLEAN       DEFAULT FALSE
  author_id   INT           FK → authors.id  CASCADE DELETE
  created_at  TIMESTAMPTZ
  updated_at  TIMESTAMPTZ

comments
  id          SERIAL PK
  body        TEXT          NOT NULL
  post_id     INT           FK → posts.id    CASCADE DELETE
  author_id   INT           FK → authors.id  CASCADE DELETE
  created_at  TIMESTAMPTZ
```

---

## Deploy on Railway

### Steps

1. Push the repo to GitHub (public).
2. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
3. Add a **PostgreSQL** plugin inside Railway.
4. Set environment variables in Railway → **Variables** tab:

| Variable      | Value                              |
|---------------|------------------------------------|
| `PORT`        | (Railway sets this automatically)  |
| `DB_HOST`     | Railway internal DB host           |
| `DB_PORT`     | 5432                               |
| `DB_USER`     | Railway DB user                    |
| `DB_PASSWORD` | Railway DB password                |
| `DB_NAME`     | railway                            |
| `NODE_ENV`    | production                         |

> **Tip:** Railway also provides a `DATABASE_URL`. You can use it directly by uncommenting the `connectionString` line in `src/db/pool.js`.

5. After first deploy, run the SQL scripts via Railway's **Database → Connect** tab or a local connection:

```bash
psql YOUR_RAILWAY_DB_URL -f sql/setup.sql
psql YOUR_RAILWAY_DB_URL -f sql/seed.sql
```

6. Your public URL:  
   `https://blog-api-production.up.railway.app`

   Internal URL (for other Railway services):  
   `blog-api.railway.internal:3000`

---

## AI usage log

This project was developed with **Claude (Anthropic)** as a coding assistant.

| Task | How AI was used |
|------|----------------|
| Project scaffolding | Generated initial folder structure and boilerplate files |
| SQL schema | Designed tables, FK constraints, and indexes |
| Express architecture | Suggested routes → controllers → services separation pattern |
| Parametrized queries | Ensured all SQL uses `$1, $2` placeholders |
| Jest tests | Generated mock-based tests for all endpoints |
| OpenAPI YAML | Documented all routes, schemas, and responses |
| README | Wrote setup, deployment, and usage instructions |

All generated code was reviewed, tested, and adapted to match the project requirements.

---

## Project structure

```
├── src/
│   ├── controllers/
│   │   ├── authors.controller.js
│   │   ├── posts.controller.js
│   │   └── comments.controller.js
│   ├── routes/
│   │   ├── authors.routes.js
│   │   ├── posts.routes.js
│   │   └── comments.routes.js
│   ├── services/
│   │   ├── authors.service.js
│   │   ├── posts.service.js
│   │   └── comments.service.js
│   ├── db/
│   │   └── pool.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── app.js
│   └── index.js
├── tests/
│   ├── authors.test.js
│   ├── posts.test.js
│   └── comments.test.js
├── sql/
│   ├── setup.sql
│   └── seed.sql
├── docs/
│   └── openapi.yaml
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
# Proyecto-m2
# q
# Proyecto-m2
# Proyecto-m2
