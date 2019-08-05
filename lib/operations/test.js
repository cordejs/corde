"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const missingTestNameErro_1 = __importDefault(require("../erros/missingTestNameErro"));
const run_1 = __importDefault(require("./run"));
function test(name) {
    if (name && name.trim() !== "") {
        return new run_1.default(name);
    }
    else {
        throw new missingTestNameErro_1.default();
    }
}
exports.default = test;
//# sourceMappingURL=test.js.map