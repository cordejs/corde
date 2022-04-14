import { EventClass } from "./types";

export const EVENT_CLASSES: EventClass = {
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
