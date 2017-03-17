import { Module } from 'magnet-core/module'
import * as NodeAcl from 'acl'
import {
  redisBackend as RedisBackend,
  mongodbBackend as MongodbBackend,
  memoryBackend as MemoryBackend
} from 'acl'

export default class MagnetAcl extends Module {
  get moduleName () { return 'acl' }
  get defaultConfig () { return __dirname }

  async setup () {
    try {
      let backend = this.config.backend

      if (this.config.redis) {
        backend = new RedisBackend(
          this.config.magnet ? this.app[this.config.magnet] : this.config.redis,
          this.config.prefix
        )
      } else if (this.config.mongodb) {
        backend = new MongodbBackend(
          this.config.magnet ? this.app[this.config.magnet] : this.config.mongodb,
          this.config.prefix
        )
      } else if (this.config.memory) {
        backend = new MemoryBackend()
      }

      this.app.nodeAcl = new NodeAcl(backend)

      if (this.config.allow) {
        await this.app.nodeAcl.allow(this.config.allow)
      }

      if (this.config.removeAllow.length) {
        for (const removeAllow of this.config.removeAllow) {
          await this.app.nodeAcl.removeAllow.apply(this.app.nodeAcl, removeAllow)
        }
      }
    } catch (err) {
      this.log.error(err)

      throw err
    }
  }
}
