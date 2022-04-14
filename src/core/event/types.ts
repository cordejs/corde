import { Client, ClientEvents } from "discord.js";

export interface IDiscordEvent<TData, TFilter> {
  canListen(): boolean;
  getIntents(): string[];
  on(fn: (message: TData) => void): this;
  once(options?: TFilter): Promise<TData>;
}

export interface IDiscordEventConstructable<TData, TFilter> {
  new (client: Client): IDiscordEvent<TData, TFilter>;
}

export type IntentType =
  | "GUILDS"
  | "GUILD_MEMBERS"
  | "GUILD_BANS"
  | "GUILD_EMOJIS_AND_STICKERS"
  | "GUILD_INTEGRATIONS"
  | "GUILD_WEBHOOKS"
  | "GUILD_INVITES"
  | "GUILD_VOICE_STATES"
  | "GUILD_PRESENCES"
  | "GUILD_MESSAGES"
  | "GUILD_MESSAGE_REACTIONS"
  | "GUILD_MESSAGE_TYPING"
  | "DIRECT_MESSAGES"
  | "DIRECT_MESSAGE_REACTIONS"
  | "DIRECT_MESSAGE_TYPING"
  | "GUILD_SCHEDULED_EVENTS";

export type EventNames = keyof ClientEvents;

export type EventClass = {
  [k in IntentType]: {
    bitfield: number;
    events: EventNames[];
  };
};
