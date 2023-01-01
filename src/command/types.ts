import { ICordeBot } from "../types";

export interface ICreateMatcherParam {
  matcher?: string;
  isNot?: boolean;
  commandName?: string | boolean | number;
  channelId?: string;
  guildId?: string;
  isDebug?: boolean;
  isCascade?: boolean;
  cordeBot?: ICordeBot;
  trace?: string;
  utility?: boolean;
  mustSendCommand?: boolean;
}
