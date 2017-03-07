import { Module } from 'magnet-core/module'
import * as NodeAcl from 'acl'
import {
  redisBackend as RedisBackend,
  mongodbBackend as MongodbBackend,
  memoryBackend as MemoryBackend
} from 'acl'

import defaultConfig from './config/nodeAcl'

export default class Acl extends Module {
  async setup () {
    try {
      const config = this.prepareConfig('nodeAcl', defaultConfig)

      let backend = config.backend

      if (config.redis) {
        backend = new RedisBackend(
          config.magnet ? this.app[config.magnet] : config.redis,
          config.prefix
        )
      } else if (config.mongodb) {
        backend = new MongodbBackend(
          config.magnet ? this.app[config.magnet] : config.mongodb,
          config.prefix
        )
      } else if (config.memory) {
        backend = new MemoryBackend()
      }

      this.app.nodeAcl = new NodeAcl(backend)

      if (config.allow) {
        this.log.info(config.allow)
        await this.app.nodeAcl.allow(config.allow)
      }

      if (config.removeAllow.length) {
        for (const removeAllow of config.removeAllow) {
          await this.app.nodeAcl.removeAllow.apply(this.app.nodeAcl, removeAllow)
        }
      }
    } catch (err) {
      this.log.error(err)

      throw err
    }
  }
}
