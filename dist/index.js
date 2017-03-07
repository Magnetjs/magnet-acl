"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const NodeAcl = require("acl");
const acl_1 = require("acl");
const nodeAcl_1 = require("./config/nodeAcl");
class Acl extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = this.prepareConfig('nodeAcl', nodeAcl_1.default);
                let backend = config.backend;
                if (config.redis) {
                    backend = new acl_1.redisBackend(config.magnet ? this.app[config.magnet] : config.redis, config.prefix);
                }
                else if (config.mongodb) {
                    backend = new acl_1.mongodbBackend(config.magnet ? this.app[config.magnet] : config.mongodb, config.prefix);
                }
                else if (config.memory) {
                    backend = new acl_1.memoryBackend();
                }
                this.app.nodeAcl = new NodeAcl(backend);
                if (config.allow) {
                    this.log.info(config.allow);
                    yield this.app.nodeAcl.allow(config.allow);
                }
                if (config.removeAllow.length) {
                    for (const removeAllow of config.removeAllow) {
                        yield this.app.nodeAcl.removeAllow.apply(this.app.nodeAcl, removeAllow);
                    }
                }
            }
            catch (err) {
                this.log.error(err);
                throw err;
            }
        });
    }
}
exports.default = Acl;
//# sourceMappingURL=index.js.map