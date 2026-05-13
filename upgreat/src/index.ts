import 'dotenv/config'
import fastify from 'fastify'
import fastifyView from '@fastify/view'
import Nunjucks from 'nunjucks'

import static_route from './static.ts'
import register_route from './register.ts'

const server = fastify({
    ajv: {
        customOptions: {
            removeAdditional: false,
            allErrors: true,
            messages: false
        }
    }
})

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

for (const path of ['about', 'contact']) {
    server.get('/' + path, async (req, reply) => {
        return reply.view(path + '.njk')
    })
}

server.register(static_route)
server.register(register_route)

server.listen({ port: Number(process.env.BACKEND_PORT),
                host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
