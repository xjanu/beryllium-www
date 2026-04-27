import 'dotenv/config'
import fastify from 'fastify'
import fastifyView from '@fastify/view'
import Handlebars from 'handlebars'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { usersTable } from './db/schema.ts';

const server = fastify()

const db = drizzle(process.env.DATABASE_URL!);
if (process.env.PROD === 'true') {
  await migrate(db, {
    migrationsFolder: "./drizzle-migrations",
  });
}

server.register(fastifyView, {
  engine: {
    handlebars: Handlebars
  },
  root: "templates/"
})

server.get('/ping', async (request, reply) => {
  return 'ping pong\n'
})

server.get("/", async (req, reply) => {
  return reply.viewAsync("index.hbs", { name: "User" });
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

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
