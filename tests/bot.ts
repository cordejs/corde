import * as Discord from "discord.js";
import { getConfig } from "../src/init";

/**
 * Receives a message, treating it and sending to the right method
 * @param msg message sent by Discord
 */
export function commandHandler(msg: Discord.Message) {
  const args = msg.content
    .slice(getConfig().botPrefix.length)
    .trim()
    .split(/ +/g);

  const command = args[0].toLowerCase();

  if (command === "hello" || command === "h") {
    hello(msg);
  } else if (command === "hey") {
    hey(msg);
  }
}

function hello(msg: Discord.Message) {
  msg.channel.send("hello!!");
}

function hey(msg: Discord.Message) {
  msg.channel.send("hey!!");
}
