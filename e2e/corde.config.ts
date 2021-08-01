// This file must be .js. If it's .ts
// for some reason, tests will throw
// Error: Cannot find module './corde.config'
// A task to fix this problem is informed on
// https://github.com/cordejs/corde/issues/490

import env from "dotenv";

const result = env.config();

// Do not throw any error if the project in running inside CI.
if (!process.env.CI && result.error) {
  throw result.error;
}

export const botPrefix = process.env.BOT_PREFIX;

// Different types of env variables are used
// to test CI environments for each OS system.

export const botTestId =
  process.env.BOT_TEST_ID ||
  process.env.BOT_TEST_ID_LINUX ||
  process.env.BOT_TEST_ID_WINDOWS ||
  process.env.BOT_TEST_ID_MAC;

export const channelId =
  process.env.CHANNEL_ID ||
  process.env.CHANNEL_ID_LINUX ||
  process.env.CHANNEL_ID_WINDOWS ||
  process.env.CHANNEL_ID_MAC;

export const cordeBotToken =
  process.env.CORDE_TEST_TOKEN ||
  process.env.CORDE_TEST_TOKEN_LINUX ||
  process.env.CORDE_TEST_TOKEN_WINDOWS ||
  process.env.CORDE_TEST_TOKEN_MAC;

export const guildId =
  process.env.GUILD_ID ||
  process.env.GUILD_ID_LINUX ||
  process.env.GUILD_ID_WINDOWS ||
  process.env.GUILD_ID_MAC;

export const botToken =
  process.env.BOT_TEST_TOKEN ||
  process.env.BOT_TEST_TOKEN_LINUX ||
  process.env.BOT_TEST_TOKEN_WINDOWS ||
  process.env.BOT_TEST_TOKEN_MAC;

export const timeout = process.env.TIME_OUT;
export const project = "./tsconfig.json";
