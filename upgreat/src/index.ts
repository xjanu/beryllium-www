import 'dotenv/config'
import fastify from 'fastify'
import fastifyView from '@fastify/view'
import Nunjucks from 'nunjucks'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import static_routes from './static.ts'
import register_routes from './register.ts'

// Server definition
const server = fastify({
    ajv: {
        customOptions: {
            removeAdditional: false,
            allErrors: true,
            messages: false
        }
    }
})

// Database connection
const db = drizzle(process.env.DATABASE_URL!);
if (process.env.NODE_ENV === 'production') {
    await migrate(db, {
        migrationsFolder: "./drizzle-migrations",
    });
}
server.decorate('db', db)

// fastify-view
server.register(fastifyView, {
    engine: {
        nunjucks: Nunjucks,
    },
    options: {noCache: process.env.NODE_ENV !== 'production'},
    root: "templates/",
})

// Include routes
server.register(static_routes)
server.register(register_routes)

// Simple routes
server.get("/", async (req, reply) => {
    return reply.viewAsync("index.njk", { name: "User" });
})
for (const path of ['about', 'contact']) {
    server.get('/' + path, async (req, reply) => {
        return reply.view(path + '.njk')
    })
}

// Start the server
server.listen({ port: Number(process.env.BACKEND_PORT),
                host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
