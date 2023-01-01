import { CommandState } from "../CommandState";

export function inChannel(this: CommandState, newChannel: string) {
  this.channelId = newChannel;
  return this;
}
