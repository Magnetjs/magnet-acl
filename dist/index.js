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
class MagnetAcl extends module_1.Module {
    get moduleName() { return 'acl'; }
    get defaultConfig() { return __dirname; }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let backend = this.config.backend;
                if (this.config.redis) {
                    backend = new acl_1.redisBackend(this.config.magnet ? this.app[this.config.magnet] : this.config.redis, this.config.prefix);
                }
                else if (this.config.mongodb) {
                    backend = new acl_1.mongodbBackend(this.config.magnet ? this.app[this.config.magnet] : this.config.mongodb, this.config.prefix);
                }
                else if (this.config.memory) {
                    backend = new acl_1.memoryBackend();
                }
                this.insert(new NodeAcl(backend));
                if (this.config.allow) {
                    yield this.app.acl.allow(this.config.allow);
                }
                if (this.config.removeAllow.length) {
                    for (const removeAllow of this.config.removeAllow) {
                        yield this.app.acl.removeAllow.apply(this.app.acl, removeAllow);
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
exports.default = MagnetAcl;
//# sourceMappingURL=index.js.map