/**
 * Enum with of all current permissions of Discord, their integer values in hexadecimal.
 *
 * https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
 */
export enum Permission {
  /**
   * Allows creation of instant invites
   * @summary For **Text** and **Voice** Channel
   */
  CREATE_INSTANT_INVITE = 0x00000001,
  /**
   * Allows kicking members
   * @summary Indifferent of channel
   */
  KICK_MEMBERS = 0x00000002,
  /**
   * Allows banning members
   * @summary Indifferent of channel
   */
  BAN_MEMBERS = 0x00000004,
  /**
   * Allows all permissions and bypasses channel permission overwrites.
   * @summary Indifferent of channel
   */
  ADMINISTRATOR = 0x00000008,
  /**
   * Allows management and editing of channels
   * @summary For **Text** and **Voice** Channel
   */
  MANAGE_CHANNELS = 0x00000010,
  /**
   * Allows management and editing of the guild
   * @summary For **Text** and **Voice** Channel
   */
  MANAGE_GUILD = 0x00000020,
  /**
   * Allows for the addition of reactions to messages
   * @summary For **Text** Channel only
   */
  ADD_REACTIONS = 0x00000040,
  /**
   * Allows for viewing of audit logs
   * @summary For **Text** and **Voice** Channel
   */
  VIEW_AUDIT_LOG = 0x00000080,
  /**
   * Allows guild members to view a channel, which includes reading messages in text channels
   * @summary Indifferent of channel
   */
  VIEW_CHANNEL = 0x00000400,
  /**
   * Allows for sending messages in a channel
   * @summary For **Text** Channel only
   */
  SEND_MESSAGES = 0x00000800,
  /**
   * Allows for sending of /tts messages
   * @summary For **Text** Channel only
   */
  SEND_TTS_MESSAGES = 0x00001000,
  /**
   * Allows for deletion of other users messages
   * @summary For **Text** Channel only
   */
  MANAGE_MESSAGES = 0x00002000,
  /**
   * Links sent by users with this permission will be auto-embedded
   * @summary For **Text** Channel only
   */
  EMBED_LINKS = 0x00004000,
  /**
   * Allows for uploading images and files
   * @summary For **Text** Channel only
   */
  ATTACH_FILES = 0x00008000,
  /**
   * Allows for reading of message history
   * @summary For **Text** Channel only
   */
  READ_MESSAGE_HISTORY = 0x00010000,
  /**
   * Allows for using the @everyone tag to notify all users in a channel,
   * and the @here tag to notify all online users in a channel
   * @summary For **Text** Channel only
   */
  MENTION_EVERYONE = 0x00020000,
  /**
   * Allows the usage of custom emojis from other servers
   * @summary For **Text** Channel only
   */
  USE_EXTERNAL_EMOJIS = 0x00040000,
  /**
   * Allows for joining of a voice channel
   * @summary For **Voice** Channel only
   */
  CONNECT = 0x00100000,
  /**
   * Allows for speaking in a voice channel
   * @summary For **Voice** Channel only
   */
  SPEAK = 0x00200000,
  /**
   * Allows for muting members in a voice channel
   * @summary For **Voice** Channel only
   */
  MUTE_MEMBERS = 0x00400000,
  /**
   * Allows for deafening of members in a voice channel
   * @summary For **Voice** Channel only
   */
  DEAFEN_MEMBERS = 0x00800000,
  /**
   * Allows for moving of members between voice channels
   * @summary For **Voice** Channel only
   */
  MOVE_MEMBERS = 0x01000000,
  /**
   * Allows for using voice-activity-detection in a voice channel
   * @summary For **Voice** Channel only
   */
  USE_VAD = 0x02000000,
  /**
   * Allows for using priority speaker in a voice channel
   * @summary For **Voice** Channel only
   */
  PRIORITY_SPEAKER = 0x00000100,
  /**
   * Allows for modification of own nickname
   * @summary Indifferent of channel
   */
  CHANGE_NICKNAME = 0x04000000,
  /**
   * Allows for modification of other users nicknames
   * @summary Indifferent of channel
   */
  MANAGE_NICKNAMES = 0x08000000,
  /**
   * Allows management and editing of roles
   * @summary For **Text** and **Voice** Channel
   */
  MANAGE_ROLES = 0x10000000,
  /**
   * Allows management and editing of webhooks
   * @summary For **Text** and **Voice** Channel
   */
  MANAGE_WEBHOOKS = 0x20000000,
  /**
   * Allows the user to go live
   * @summary For **Voice** Channel only
   */
  STREAM = 0x00000200,
  /**
   * Allows for viewing guild insights
   * @summary Indifferent of channel
   */
  VIEW_GUILD_INSIGHTS = 0x00080000,
  /**
   * Allows management and editing of emojis and stickers
   */
  MANAGE_EMOJIS_AND_STICKERS = 0x0000000040000000,
  /**
   * Allows members to use application commands, including slash commands and context menu commands.
   */
  USE_APPLICATION_COMMANDS = 0x0000000080000000,
  /**
   * Allows for requesting to speak in stage channels.
   * (*This permission is under active development and may be changed or removed*.)
   */
  REQUEST_TO_SPEAK = 0x0000000100000000,
  /**
   * Allows for deleting and archiving threads, and viewing all private threads
   */
  MANAGE_THREADS = 0x0000000400000000,
  /**
   * Allows for creating threads
   */
  CREATE_PUBLIC_THREADS = 0x0000000800000000,
  /**
   * Allows for creating private threads
   */
  CREATE_PRIVATE_THREADS = 0x0000001000000000,
  /**
   * Allows the usage of custom stickers from other servers
   */
  USE_EXTERNAL_STICKERS = 0x0000002000000000,
  /**
   * Allows for sending messages in threads
   */
  SEND_MESSAGES_IN_THREADS = 0x0000004000000000,
  /**
   * Allows for launching activities (applications with the **EMBEDDED** flag) in a voice channel
   */
  START_EMBEDDED_ACTIVITIES = 0x0000008000000000,
  /**
   * Allows for timing out users to prevent them from
   * sending or reacting to messages in chat and threads,
   * and from speaking in voice and stage channels
   */
  MODERATE_MEMBERS = 0x0000010000000000,
  /**
   * Allows for creating, editing, and deleting scheduled events
   * @summary Indifferent of channel
   */
  MANAGE_EVENTS = 0x0000000200000000,
  USE_PRIVATE_THREADS,
  USE_PUBLIC_THREADS,
}

export enum ColorsHex {
  DEFAULT = 0x000000,
  WHITE = 0xffffff,
  AQUA = 0x1abc9c,
  GREEN = 0x2ecc71,
  BLUE = 0x3498db,
  YELLOW = 0xffff00,
  PURPLE = 0x9b59b6,
  LUMINOUS_VIVID_PINK = 0xe91e63,
  GOLD = 0xf1c40f,
  ORANGE = 0xe67e22,
  RED = 0xe74c3c,
  GREY = 0x95a5a6,
  NAVY = 0x34495e,
  DARK_AQUA = 0x11806a,
  DARK_GREEN = 0x1f8b4c,
  DARK_BLUE = 0x206694,
  DARK_PURPLE = 0x71368a,
  DARK_VIVID_PINK = 0xad1457,
  DARK_GOLD = 0xc27c0e,
  DARK_ORANGE = 0xa84300,
  DARK_RED = 0x992d22,
  DARK_GREY = 0x979c9f,
  DARKER_GREY = 0x7f8c8d,
  LIGHT_GREY = 0xbcc0c0,
  DARK_NAVY = 0x2c3e50,
  BLURPLE = 0x7289da,
  GREYPLE = 0x99aab5,
  DARK_BUT_NOT_BLACK = 0x2c2f33,
  NOT_QUITE_BLACK = 0x23272a,
}

export enum Colors {
  DEFAULT = "#000000",
  WHITE = "#FFFFFF",
  AQUA = "#1ABC9C",
  GREEN = "#2ECC71",
  BLUE = "#3498DB",
  PURPLE = "#9B59B6",
  GOLD = "#E91E63",
  ORANGE = "#E67E22",
  RED = "#E74C3C",
  GREY = "#95A5A6",
  DARKER_GREY = "#7F8C8D",
  NAVY = "#34495E",
  DARK_AQUA = "#11806A",
  DARK_GREEN = "#1F8B4C",
  DARK_BLUE = "#206694",
  DARK_PURPLE = "#71368A",
  DARK_GOLD = "#C27C0E",
  DARK_ORANGE = "#A84300",
  DARK_RED = "#992D22",
  DARK_GREY = "#7F8C8D",
  LIGHT_GREY = "#BCC0C0",
  DARK_NAVY = "#2C3E50",
  LUMINOUS_VIVID_PINK = "#E91E63",
  DARK_VIVID_PINK = "#AD1457",
}
