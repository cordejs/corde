import { Client } from "discord.js";
import Utils from "./testUtils";
import * as config from "./corde.config";

export const bot = new Client();

bot.on("message", async (message) => {
  const command = Utils.parseCommand(message, config.botPrefix);
  if (command === "hello" || command === "h") {
    message.channel.send("Hello!!");
  }
});
