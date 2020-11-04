"use strict";
const env = require("dotenv");
const result = env.config();
if (result.error) {
  throw result.error;
}
module.exports = {
  botPrefix: process.env.BOT_PREFIX,
  botTestId: process.env.BOT_TEST_ID,
  channelId: process.env.CHANNEL_ID,
  cordeTestToken: process.env.CORDE_TEST_TOKEN,
  guildId: process.env.GUILD_ID,
  testFiles: [process.env.TEST_FILES_DIR],
  botTestToken: process.env.BOT_TEST_TOKEN,
  timeOut: process.env.TIME_OUT,
};
