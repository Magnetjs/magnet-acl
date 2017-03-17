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

  // https://github.com/OptimalBits/node_acl#allow-roles-resources-permissions-functionerr-
  allow: [
    // {
    //   roles: 'admin',
    //   allows: [
    //     { resources: ['user'], permissions: '*' }
    //   ]
    // }
  ],

  // Since acl.allow doesn't sync with database, we have to manually remove the
  // permission via node.removeAllow
  // Everytime you remove a permission from allow, you have to add it here.
  // https://github.com/OptimalBits/node_acl#removeallow-role-resources-permissions-functionerr-
  removeAllow: [
    // ['user', 'company', 'delete']
  ],
}
