import { Client, ClientEvents } from "discord.js";
import { object } from "../utils/object";

type IntentType =
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

type EventClass = {
  [k in IntentType]: {
    bitfield: number;
    events: EventNames[];
  };
};
export namespace intentHelper {
  const EVENT_CLASS: EventClass = {
    GUILDS: {
      bitfield: 1 << 0,
      events: [
        "guildCreate",
        "guildUpdate",
        "guildDelete",
        "roleCreate",
        "roleUpdate",
        "roleDelete",
        "channelCreate",
        "channelUpdate",
        "channelDelete",
        "channelPinsUpdate",
        "threadCreate",
        "threadUpdate",
        "threadDelete",
        "threadListSync",
        "threadMemberUpdate",
        "threadMembersUpdate",
        "stageInstanceCreate",
        "stageInstanceUpdate",
        "stageInstanceDelete",
      ],
    },
    GUILD_MEMBERS: {
      bitfield: 1 << 1,
      events: ["guildMemberAdd", "guildMemberUpdate", "guildMemberRemove", "threadMembersUpdate"],
    },
    GUILD_BANS: {
      bitfield: 1 << 2,
      events: ["guildBanAdd", "guildBanRemove"],
    },
    GUILD_EMOJIS_AND_STICKERS: {
      bitfield: 1 << 3,
      events: ["emojiUpdate"],
    },
    GUILD_INTEGRATIONS: {
      bitfield: 1 << 4,
      events: ["guildIntegrationsUpdate", "interactionCreate"],
    },
    GUILD_WEBHOOKS: {
      bitfield: 1 << 5,
      events: ["webhookUpdate"],
    },
    GUILD_INVITES: {
      bitfield: 1 << 6,
      events: ["inviteCreate", "inviteDelete"],
    },
    GUILD_VOICE_STATES: {
      bitfield: 1 << 7,
      events: ["voiceStateUpdate"],
    },
    GUILD_PRESENCES: {
      bitfield: 1 << 8,
      events: ["presenceUpdate"],
    },
    GUILD_MESSAGES: {
      bitfield: 1 << 9,
      events: ["messageCreate", "messageUpdate", "messageDelete", "messageDeleteBulk"],
    },
    GUILD_MESSAGE_REACTIONS: {
      bitfield: 1 << 10,
      events: [
        "messageReactionAdd",
        "messageReactionRemove",
        "messageReactionRemoveAll",
        "messageReactionRemoveEmoji",
      ],
    },
    GUILD_MESSAGE_TYPING: {
      bitfield: 1 << 11,
      events: ["typingStart"],
    },
    DIRECT_MESSAGES: {
      bitfield: 1 << 12,
      events: ["messageCreate", "messageUpdate", "messageDelete", "channelPinsUpdate"],
    },
    DIRECT_MESSAGE_REACTIONS: {
      bitfield: 1 << 13,
      events: [
        "messageReactionAdd",
        "messageReactionRemove",
        "messageReactionRemoveAll",
        "messageReactionRemoveEmoji",
      ],
    },
    DIRECT_MESSAGE_TYPING: {
      bitfield: 1 << 14,
      events: ["typingStart"],
    },
    GUILD_SCHEDULED_EVENTS: {
      bitfield: 1 << 16,
      events: [
        "guildScheduledEventCreate",
        "guildScheduledEventUpdate",
        "guildScheduledEventDelete",
        "guildScheduledEventUserAdd",
        "guildScheduledEventUserRemove",
      ],
    },
  };

  /**
   * Check if the Client has permission to access a given event:
   */
  export function hasIntentFor(client: Client, eventName: EventNames) {
    const eventClass = object.find(EVENT_CLASS, (obj) => {
      return obj.events.includes(eventName);
    });

    if (!eventClass) {
      return false;
    }

    const intents = client.options.intents as number;
    return (intents & eventClass.bitfield) != 0;
  }

  export function getIntentForEvent(eventName: EventNames) {
    const eventClasses: string[] = [];
    object.foreachKey(EVENT_CLASS, (key) => {
      if (EVENT_CLASS[key].events.includes(eventName)) {
        eventClasses.push(key);
        return;
      }
    });

    return eventClasses;
  }
}
