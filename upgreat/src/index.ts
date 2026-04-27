import fastify from 'fastify'
import fastifyView from '@fastify/view'
import Handlebars from 'handlebars'

const server = fastify()

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

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
