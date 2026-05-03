UpGREAT! camp website
=====================

## TODO
- infra
  - database backups?
- file structure
  - backend
  - api
  - frontend
  - static
  - db?
  - templates?
- website
  - favicon.{png,ico}
  - signup form
    - frontend
      - validate
        - RČ
        - days
        - error messages
      - price calculator
    - backend
      - save
      - validate
      - return something meaningful
  - login
  - show signups
  - link shortener
  - admin
    - file upload
    - wiki
- etc
  - domain name
  - standalone VPS
  - containarise
  - static files should still be templated (Same layout), but compiled once
    and served by nginx
  - dynamic files will be in /auth namespace and rendered on-the-fly
  - automatic nbsp for templates
  - api endpoints should be separated from rendered html
  - client-side javascript should also be compiled from typescript

## Technologies
- typescript
- fastify backend
  - @fastify/view + nunjucks for templates
  - @fastify/formbody for html form decoding
- postgres + drizzle ORM/migrations

## Develop

- Start backend server
```
cp env.example .env
vim .env
npm i
npm run dev
```

- Compile frontend on change
```
cd client
npm i
npm run dev

- Run the database server
```
docker compose up upgreat-db
```
