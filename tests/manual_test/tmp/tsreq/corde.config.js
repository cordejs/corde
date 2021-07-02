/* eslint-disable @typescript-eslint/no-var-requires */
// This file must be .js. If it's .ts
// for some reason, tests will throw
// Error: Cannot find module './corde.config'
// A task to fix this problem is informed on
// https://github.com/cordejs/corde/issues/490
var env = require("dotenv");
var result = env.config();
// Do not throw any error if the project in running inside CI.
if (!process.env.CI && result.error) {
  throw result.error;
}
var botPrefix = process.env.BOT_PREFIX;
var botTestId = process.env.BOT_TEST_ID;
var channelId = process.env.CHANNEL_ID;
var cordeBotToken = process.env.CORDE_TEST_TOKEN;
var guildId = process.env.GUILD_ID;
var testMatches = ["./test/**"];
var botToken = process.env.BOT_TEST_TOKEN;
var timeout = process.env.TIME_OUT;
module.exports = {
  botPrefix: botPrefix,
  botTestId: botTestId,
  channelId: channelId,
  cordeBotToken: cordeBotToken,
  guildId: guildId,
  botToken: botToken,
  testMatches: testMatches,
  timeout: timeout,
};
