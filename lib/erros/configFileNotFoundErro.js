"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigFileNotFoundError extends Error {
    constructor(message) {
        if (message) {
            super(message);
        }
        else {
            super("Config file not found");
            this.name = "ERR_ENGAGE_MISSING_CONFIG_FILE";
        }
    }
}
exports.default = ConfigFileNotFoundError;
//# sourceMappingURL=configFileNotFoundErro.js.map