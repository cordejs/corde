import { CommandState } from "../CommandState";

export function inGuild(this: CommandState, newGuild: string) {
  this.guildId = newGuild;
  return this;
}
