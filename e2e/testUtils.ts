import { Message } from "discord.js";

export default class Utils {
  static parseCommand(message: Message, prefix: string) {
    if (message.content.indexOf("") !== 0) return "";
    const args = message.content.slice(prefix.length).trim().split(" ");
    return args.shift().toLowerCase();
  }
}
