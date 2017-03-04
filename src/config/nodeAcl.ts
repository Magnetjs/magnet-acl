// import { createClient } from 'redis'
// import { redisBackend as RedisBackend } from 'acl'

// const backend = new RedisBackend(client)

export default {
  prefix: 'acl',

  memory: true,

  // redis: createClient(6379, '127.0.0.1', { no_ready_check: true })

  // mongodb: dbInstance,

  // Or

  // redis: true,
  // magnet: 'redis' // load from this.app.redis

  // mongodb: true,
  // magnet: 'mongodb', // load from this.app.mongodb

  // Or

  // backend: backend
}
