"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingTestNameError extends Error {
    constructor(message) {
        if (message) {
            super(message);
        }
        else {
            super("Test name not defined");
            this.name = "ERR_ENGAGE_MISSING_TEST_NAME";
        }
    }
}
exports.default = MissingTestNameError;
//# sourceMappingURL=missingTestNameErro.js.map