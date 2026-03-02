import Fastify from 'fastify'

const fastify = Fastify({
  logger: {
    level: "warn"
  }
})

fastify.get('/greeting', (request, reply) => {
    reply.send("Hello World!")
})

fastify.listen({ port: 8080 }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})