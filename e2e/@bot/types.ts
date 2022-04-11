import { Message } from "discord.js";

export interface ICommand {
  action: (message: Message, ...args: any[]) => Promise<void>;
}
