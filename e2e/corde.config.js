// This file must be .js. If it's .ts
// for some reason, tests will throw
// Error: Cannot find module './corde.config'
// A task to fix this problem is informed on
// https://github.com/lucasgmagalhaes/corde/issues/490

import env from "dotenv";

var result = env.config();

if (result.error) {
  throw result.error;
}

export const botPrefix = process.env.BOT_PREFIX;
export const botTestId = process.env.BOT_TEST_ID;
export const channelId = process.env.CHANNEL_ID;
export const cordeTestToken = process.env.CORDE_TEST_TOKEN;
export const guildId = process.env.GUILD_ID;
export const testFiles = [process.env.TEST_FILES_DIR];
export const botTestToken = process.env.BOT_TEST_TOKEN;
export const timeOut = process.env.TIME_OUT;
