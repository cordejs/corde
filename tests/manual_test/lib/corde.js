"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeOut = exports.botTestToken = exports.testFiles = exports.guildId = exports.cordeTestToken = exports.channelId = exports.botTestId = exports.botPrefix = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const result = dotenv_1.default.config();
if (result.error) {
  throw result.error;
}
exports.botPrefix = process.env.BOT_PREFIX;
exports.botTestId = process.env.BOT_TEST_ID;
exports.channelId = process.env.CHANNEL_ID;
exports.cordeTestToken = process.env.CORDE_TEST_TOKEN;
exports.guildId = process.env.GUILD_ID;
exports.testFiles = [process.env.TEST_FILES_DIR];
exports.botTestToken = process.env.BOT_TEST_TOKEN;
exports.timeOut = process.env.TIME_OUT;
