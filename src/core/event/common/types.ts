import { Client, ClientEvents } from "discord.js";

export type EventNames = keyof ClientEvents;

export type Spread<T extends EventNames> = ClientEvents[T][1] extends undefined
  ? ClientEvents[T] extends (infer U)[]
    ? U
    : never
  : ClientEvents[T];

export interface IDiscordEvent<TEvent extends EventNames, TFilter> {
  canListen(): boolean;
  getIntents(): string[];
  on(fn: (...args: ClientEvents[TEvent]) => void): this;
  once(filter?: TFilter): Promise<Spread<TEvent>>;
}

export interface IDiscordEventConstructable<TEvent extends EventNames, TFilter> {
  new (client: Client): IDiscordEvent<TEvent, TFilter>;
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

export type EventClass = {
  [k in IntentType]: {
    bitfield: number;
    events: EventNames[];
  };
};
