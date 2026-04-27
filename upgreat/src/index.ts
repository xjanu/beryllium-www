import 'dotenv/config'
import fastify from 'fastify'
import fastifyView from '@fastify/view'
import Nunjucks from 'nunjucks'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import static_route from './static.ts'
import { usersTable } from './db/schema.ts'

const server = fastify()

const db = drizzle(process.env.DATABASE_URL!);
if (process.env.NODE_ENV === 'production') {
  await migrate(db, {
    migrationsFolder: "./drizzle-migrations",
  });
}

server.register(fastifyView, {
  engine: {
    nunjucks: Nunjucks,
  },
  options: {noCache: process.env.NODE_ENV !== 'production'},
  root: "templates/",
})

server.get("/", async (req, reply) => {
  return reply.viewAsync("index.njk", { name: "User" });
})

server.get('/ping', async (request, reply) => {
  return 'ping pong\n'
})

server.get("/pg", async (req, reply) => {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);

  return users;
})

server.register(static_route)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
