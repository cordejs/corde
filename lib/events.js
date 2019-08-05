"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("./global");
const begin_1 = __importDefault(require("./begin"));
global_1.concord.on("ready", () => {
    console.log(`${global_1.concord.user.username} is ready`);
});
global_1.concord.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
    if (!msg.author.bot || msg.author.id !== global_1.configs.botTestId)
        return;
    else if (!msg.content.startsWith(global_1.configs.botPrefix, 0))
        return;
    else if (msg.content === `${global_1.configs.botPrefix}runtests`) {
        begin_1.default();
    }
}));
//# sourceMappingURL=events.js.map