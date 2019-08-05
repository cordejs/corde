"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingPropertyError extends Error {
    constructor(message) {
        if (message) {
            super(message);
        }
        else {
            super("Required property not found");
            this.name = "ERR_ENGAGE_MISSING_PROPERTY";
        }
    }
}
exports.default = MissingPropertyError;
//# sourceMappingURL=missingPropertyError.js.map