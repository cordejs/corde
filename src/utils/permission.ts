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
   * Allows management and editing of emojis
   * @summary Indifferent of channel
   */
  MANAGE_EMOJIS = 0x40000000,
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
}

/**
 * Convert a list of permissions into an integer value.
 * @param permissions Permissions to be converted
 */
export function calcPermissionsValue(...permissions: Permission[]) {
  // tslint:disable-next-line: no-bitwise
  return permissions.reduce((p1, p2) => p1 | p2);
}
