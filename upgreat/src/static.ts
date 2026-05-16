import { FastifyInstance } from "fastify"
import FastifyStatic from "@fastify/static"
import path from "node:path"

const routes = async (fastify: FastifyInstance, options: Object) => {

  fastify.register(FastifyStatic, {
    root: path.resolve('templates/static/'),
    prefix: '/static/',
  })

  // Serve also client javascript
  fastify.register(FastifyStatic, {
    root: path.resolve('client/dist/'),
    prefix: '/scripts/',
    decorateReply: false,
  })
}

export default routes;
