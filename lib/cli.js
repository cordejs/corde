#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = __importDefault(require("commander"));
const initializer_1 = require("./initializer");
clear_1.default();
console.log(chalk_1.default.red(figlet_1.default.textSync('Concord', { horizontalLayout: 'full' })));
commander_1.default
    .version('0.0.1')
    .description("Discord bot testing framework")
    .option('-r, --run', 'run tests')
    .parse(process.argv);
if (commander_1.default.run) {
    initializer_1.begin();
}
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
//# sourceMappingURL=cli.js.map