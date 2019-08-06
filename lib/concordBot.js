"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initializer_1 = __importDefault(require("./initializer"));
function hello(msg) {
    msg.channel.send("hello!!");
}
function commandHandler(msg) {
    const args = msg.content
        .slice(initializer_1.default.botPrefix.length)
        .trim()
        .split(/ +/g);
    const command = args[0].toLowerCase();
    if (command === "hello" || command === "h")
        hello(msg);
}
exports.commandHandler = commandHandler;
//# sourceMappingURL=concordBot.js.map