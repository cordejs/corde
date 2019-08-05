"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingTestsErro extends Error {
    constructor(message) {
        if (message) {
            super(message);
        }
        else {
            super("There is no tests to be executed");
            this.name = "ERR_ENGAGE_MISSING_TESTS";
        }
    }
}
exports.default = MissingTestsErro;
//# sourceMappingURL=missingTestsError.js.map