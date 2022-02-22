/* eslint-disable @typescript-eslint/no-var-requires */
const env = require("dotenv");

var result = env.config();

// Do not throw any error if the project in running inside CI.
if (!process.env.CI && result.error) {
  throw result.error;
}

module.exports = {
  botPrefix: process.env.BOT_PREFIX,
  botTestId: process.env.BOT_TEST_ID,
  channelId: process.env.CHANNEL_ID,
  cordeBotToken: process.env.CORDE_TEST_TOKEN,
  guildId: process.env.GUILD_ID,
  testMatches: [process.env.TEST_FILES_DIR],
  timeout: process.env.TIME_OUT,
};
