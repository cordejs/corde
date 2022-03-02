import { Message } from "discord.js";

export interface Command {
  name: string;
  action: (message: Message, ...args: any[]) => Promise<void>;
}
