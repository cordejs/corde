/* eslint-disable no-console */
// This file must be .js. If it's .ts
// for some reason, tests will throw
// Error: Cannot find module './corde.config'
// A task to fix this problem is informed on
// https://github.com/cordejs/corde/issues/490

import env from "dotenv";
import testUtils from "./testUtils";

const result = env.config({ debug: testUtils.isDebug(), path: "./e2e/.env" });

// Do not throw any error if the project in running inside CI.
if (!process.env.CI && result.error) {
  throw result.error;
}

// Different types of env variables are used
// to test CI environments for each OS system.

const configs = testUtils.getEnvConfig();

export const botTestId = configs.botTestId;
export const channelId = configs.channelId;
export const cordeBotToken = configs.cordeBotToken;
export const guildId = configs.guildId;
export const botToken = configs.botToken;
export const botPrefix = configs.botPrefix;
export const timeout = configs.timeout;
export const project = "./tsconfig.json";

console.log(configs);

if (testUtils.isDebug()) {
  console.log("Loaded configs: ");
  console.log(configs);
}
