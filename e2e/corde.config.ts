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
