import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    db: NodePgDatabase<Record<string, never>>
  }
}