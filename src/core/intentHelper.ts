import { Client, ConstantsEvents } from "discord.js";
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

type EventNames = keyof ConstantsEvents;
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
        "GUILD_CREATE",
        "GUILD_UPDATE",
        "GUILD_DELETE",
        "GUILD_ROLE_CREATE",
        "GUILD_ROLE_UPDATE",
        "GUILD_ROLE_DELETE",
        "CHANNEL_CREATE",
        "CHANNEL_UPDATE",
        "CHANNEL_DELETE",
        "CHANNEL_PINS_UPDATE",
        "THREAD_CREATE",
        "THREAD_UPDATE",
        "THREAD_DELETE",
        "THREAD_LIST_SYNC",
        "THREAD_MEMBER_UPDATE",
        "THREAD_MEMBERS_UPDATE",
        "STAGE_INSTANCE_CREATE",
        "STAGE_INSTANCE_UPDATE",
        "STAGE_INSTANCE_DELETE",
      ],
    },
    GUILD_MEMBERS: {
      bitfield: 1 << 1,
      events: [
        "GUILD_MEMBER_ADD",
        "GUILD_MEMBER_UPDATE",
        "GUILD_MEMBER_REMOVE",
        "THREAD_MEMBERS_UPDATE",
      ],
    },
    GUILD_BANS: {
      bitfield: 1 << 2,
      events: ["GUILD_BAN_ADD", "GUILD_BAN_REMOVE"],
    },
    GUILD_EMOJIS_AND_STICKERS: {
      bitfield: 1 << 3,
      events: ["GUILD_EMOJI_UPDATE"],
    },
    GUILD_INTEGRATIONS: {
      bitfield: 1 << 4,
      events: ["GUILD_INTEGRATIONS_UPDATE", "INTERACTION_CREATE", "GUILD_INTEGRATIONS_UPDATE"],
    },
    GUILD_WEBHOOKS: {
      bitfield: 1 << 5,
      events: ["WEBHOOKS_UPDATE"],
    },
    GUILD_INVITES: {
      bitfield: 1 << 6,
      events: ["INVITE_CREATE", "INVITE_DELETE"],
    },
    GUILD_VOICE_STATES: {
      bitfield: 1 << 7,
      events: ["VOICE_STATE_UPDATE"],
    },
    GUILD_PRESENCES: {
      bitfield: 1 << 8,
      events: ["PRESENCE_UPDATE"],
    },
    GUILD_MESSAGES: {
      bitfield: 1 << 9,
      events: ["MESSAGE_CREATE", "MESSAGE_UPDATE", "MESSAGE_DELETE", "MESSAGE_BULK_DELETE"],
    },
    GUILD_MESSAGE_REACTIONS: {
      bitfield: 1 << 10,
      events: [
        "MESSAGE_REACTION_ADD",
        "MESSAGE_REACTION_REMOVE",
        "MESSAGE_REACTION_REMOVE_ALL",
        "MESSAGE_REACTION_REMOVE_EMOJI",
      ],
    },
    GUILD_MESSAGE_TYPING: {
      bitfield: 1 << 11,
      events: ["TYPING_START"],
    },
    DIRECT_MESSAGES: {
      bitfield: 1 << 12,
      events: ["MESSAGE_CREATE", "MESSAGE_UPDATE", "MESSAGE_DELETE", "CHANNEL_PINS_UPDATE"],
    },
    DIRECT_MESSAGE_REACTIONS: {
      bitfield: 1 << 13,
      events: [
        "MESSAGE_REACTION_ADD",
        "MESSAGE_REACTION_REMOVE",
        "MESSAGE_REACTION_REMOVE_ALL",
        "MESSAGE_REACTION_REMOVE_EMOJI",
      ],
    },
    DIRECT_MESSAGE_TYPING: {
      bitfield: 1 << 14,
      events: ["TYPING_START"],
    },
    GUILD_SCHEDULED_EVENTS: {
      bitfield: 1 << 16,
      events: [
        "GUILD_SCHEDULED_EVENT_CREATE",
        "GUILD_SCHEDULED_EVENT_UPDATE",
        "GUILD_SCHEDULED_EVENT_DELETE",
        "GUILD_SCHEDULED_EVENT_USER_ADD",
        "GUILD_SCHEDULED_EVENT_USER_REMOVE",
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
}
