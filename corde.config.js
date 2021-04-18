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
  cordeTestToken: process.env.CORDE_TEST_TOKEN,
  guildId: process.env.GUILD_ID,
  testFiles: [process.env.TEST_FILES_DIR],
  botTestToken: process.env.BOT_TEST_TOKEN,
  timeout: process.env.TIME_OUT,
};
