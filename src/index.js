import Fastify from 'fastify'
import { Datastore } from '@google-cloud/datastore'

const fastify = Fastify({
  logger: {
    level: "warn"
  }
})

const datastore = new Datastore()

fastify.get("/greeting", (request, reply) => {
  reply.send("<h1>Hello World!</h1>")
})

fastify.post("/register", async (request, reply) => {
  const username = request.body.username
  const userKey = datastore.key(["User", username])
  await datastore.save({
    key: userKey,
    data: { username: username },
  })
  reply.status(200).send({ message: "User registered" })
})

fastify.get("/list", async (request, reply) => {
  const query = datastore.createQuery("User")
  const [users] = await datastore.runQuery(query)
  const usernames = users.map((user) => user.username)
  reply.send({ users: usernames })
})

fastify.post("/clear", async (request, reply) => {
  const query = datastore.createQuery("User")
  const [users] = await datastore.runQuery(query)
  const keys = users.map((user) => user[datastore.KEY])
  if (keys.length > 0) {
    await datastore.delete(keys)
  }
  reply.status(200).send({ message: "Cleared" })
})

fastify.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})