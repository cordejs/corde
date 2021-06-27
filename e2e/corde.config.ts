// This file must be .js. If it's .ts
// for some reason, tests will throw
// Error: Cannot find module './corde.config'
// A task to fix this problem is informed on
// https://github.com/cordejs/corde/issues/490

import env from "dotenv";

var result = env.config();

// Do not throw any error if the project in running inside CI.
if (!process.env.CI && result.error) {
  throw result.error;
}

export const botPrefix = process.env.BOT_PREFIX;
export const botTestId = process.env.BOT_TEST_ID;
export const channelId = process.env.CHANNEL_ID;
export const cordeBotToken = process.env.CORDE_TEST_TOKEN;
export const guildId = process.env.GUILD_ID;
export const testMatches = [process.env.TEST_FILES_DIR];
export const botToken = process.env.BOT_TEST_TOKEN;
export const timeout = process.env.TIME_OUT;
