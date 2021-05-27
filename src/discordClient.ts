import { Client } from "discord.js";

/**
 * Inits Discord Client checking the actual environment
 *
 * @internals
 */
export function initDiscordClient() {
  if (process.env.ENV == "UNITY_TEST") {
    return new Client({
      restSweepInterval: 0,
    });
  }
  return new Client();
}
