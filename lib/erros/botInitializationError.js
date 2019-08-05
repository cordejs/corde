"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotInitializationError extends Error {
    constructor(message) {
        if (message) {
            super(message);
        }
        else {
            super("Fail in the attempt of login to bot");
            this.name = "ERR_concord_LOGIN_FAIL";
        }
    }
}
exports.default = BotInitializationError;
//# sourceMappingURL=botInitializationError.js.map