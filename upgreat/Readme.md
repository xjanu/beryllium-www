UpGREAT! camp website
=====================

## TODO
- infra
  - database + migration
- website
  - static landing page
  - style.css
  - favicon.{png,ico}
  - signup form
    - login
    - confirm email?
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
  - api endpoints should be separated from rendered html
  - client-side javascript should also be compiled from typescript

## Technologies
- typescript
- fastify backend
- @fastify/view + handlebars for templates
- TODO: decide on database and migration tool

## Update, Build, Develop, Deploy
TODO
