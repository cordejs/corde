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
function errorThrowMesage(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return Promise.reject(msg);
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.errorThrowMesage = errorThrowMesage;
function errorThrow(error) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return Promise.reject();
        }
        catch (err) {
            throw error;
        }
    });
}
exports.errorThrow = errorThrow;
//# sourceMappingURL=handler.js.map