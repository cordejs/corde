import {
  EmojiLike,
  MessageIdentifier,
  MessageEditedIdentifier,
  MessageEmbedLike,
  ChannelLocation,
  RoleIdentifier,
  TestFunctionType,
  CordeBotLike,
} from "../types";
import { ColorResolvable } from "discord.js";
import { Colors, RolePermission } from "../utils";

export interface ExpectTestBaseParams {
  cordeBot: CordeBotLike;
  command: string | number | boolean;
  isNot: boolean;
  timeout: number;
  isCascade: boolean;
  channelId?: string;
  guildId?: string;
}
export interface ExpectTestParams extends ExpectTestBaseParams {
  testName: string;
}

export type MayReturnMatch = Matches<any> | void;

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 *
 */
export interface MessageMatches<TReturn extends MayReturnMatch> {
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message returned by a bot after invoke a command
   * @since 1.0
   */
  toReturn(expect: bigint | boolean | number | string): TReturn;
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message returned by a bot after invoke a command
   * @since 1.0
   */
  toReturn(expect: MessageEmbedLike): TReturn;

  /**
   * Defines the message expected to be returned by a
   * command in a specific channel and guild(optional).
   *
   * @param expect A message returned by a bot after invoke a command
   * @param channelId Id of the channel where the message must be sent to.
   * @param guildId Id of the guild that contains the channel where the message must be sent to.
   * @since 3.0
   */
  toReturnInChannel(
    expect: bigint | boolean | number | string | MessageEmbedLike,
    channelId: string,
    guildId?: string,
  ): TReturn;

  /**
   * Defines the message expected to be returned by a
   * command in a specific channel and guild(optional).
   *
   * @param expect A message returned by a bot after invoke a command.
   * @param channelLocation Object with to holds the id of the channel and of the guild (optional).
   * @since 3.0
   */
  toReturnInChannel(
    expect: bigint | boolean | number | string | MessageEmbedLike,
    channelLocation: ChannelLocation,
  ): TReturn;

  /**
   * Defines [reactions](https://discordjs.guide/popular-topics/reactions.html#reacting-to-messages)
   * that must be added to the command message.
   *
   * @param emojis Single or list of reactions that must be added to a message.
   * It can be **emojis** or [custom emojis](https://support.discord.com/hc/en-us/articles/360036479811-Custom-Emojis).
   *
   * @example
   *
   * // Checks if the first message sent by the testing bot receives emojis in reactions.
   * expect("emoji").toAddReaction(['😄']);
   * expect("emoji").toAddReaction([{ name: '😄' }]);
   * expect("emoji").toAddReaction([{ name: '😄' }]);
   * expect("emoji").toAddReaction(['🍊', { name: '😄' }]);
   * expect("emoji").toAddReaction(['🍊', { name: '😄' }]);
   *
   * // Checks if a specific message receives emojis in reactions.
   * expect("emoji").toAddReaction(['😄'], { id: '96008815106887111' });
   * expect("emoji").toAddReaction([{ name: '😄' }], { id: '96008815106887111' });
   *
   * // This example will find for a message with content: 'message text'
   * expect("emoji").toAddReaction([{ name: '😄' }], { name: 'message text' });
   * expect("emoji").toAddReaction(['🍊', { name: '😄' }], { id: 'message text' });
   * expect("emoji").toAddReaction(['🍊', { name: '😄' }], { id: 'message text' });
   *
   * // Its also possible to search the message directly by it's id:
   * expect("emoji").toAddReaction(['😄'], '96008815106887111');
   *
   * @since 1.0
   */
  toAddReaction(emojis: string[]): TReturn;
  toAddReaction(emojis: EmojiLike[]): TReturn;
  toAddReaction(emojis: (string | EmojiLike)[]): TReturn;
  toAddReaction(emojis: EmojiLike[], messageIdentifier: string): TReturn;
  toAddReaction(emojis: EmojiLike[], messageIdentifier: MessageIdentifier): TReturn;
  toAddReaction(emojis: (string | EmojiLike)[], messageIdentifier: string): TReturn;
  toAddReaction(emojis: (string | EmojiLike)[], messageIdentifier: MessageIdentifier): TReturn;
  toAddReaction(emojis: string[], messageIdentifier: string): TReturn;
  toAddReaction(emojis: string[], messageIdentifier: MessageIdentifier): TReturn;

  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @example
   *
   * toRemoveReaction([{ id: "12321" }, "😆"]);
   * toRemoveReaction([{ id: "12321" }, "😆"], "31241212512");
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: EmojiLike[], messageId?: string): TReturn;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @param messageIdentifier Object with **id** or **content** of the message.
   * @example
   *
   * toRemoveReaction([{ id: "12321" }, { name: "😆" }]);
   * toRemoveReaction([{ id: "12321" }, { name: "😆" }], { id: "1232142"});
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: EmojiLike[], messageIdentifier?: MessageIdentifier): TReturn;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @param messageId Id of the message.
   * @example
   *
   * toRemoveReaction([{ id: "12321" }, "😆"]);
   * toRemoveReaction([{ id: "12321" }, "😆"], "4121512121");
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: (string | EmojiLike)[], messageId?: string): TReturn;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
   * @param messageIdentifier Object with **id** or **content** of the message.
   * @example
   *
   * toRemoveReaction([{ id: "12321" }, "😆"]);
   * toRemoveReaction([{ id: "12321" }, "😆"], { id: "4121512121" });
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: (string | EmojiLike)[], messageIdentifier?: MessageIdentifier): TReturn;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed
   * @param messageId Id of the message.
   * @example
   *
   * toRemoveReaction(["😆"]);
   * toRemoveReaction(["😆"], { id: "13124124" });
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: string[], messageId?: string): TReturn;
  /**
   * Check if a command removes a list of reactions from the last message sent
   * by someone who is not the the testing bot or corde's bot.
   *
   * @param emojis Reactions to check if were removed.
   * @param messageIdentifier Object with **id** or **content** of the message.
   * @example
   *
   * toRemoveReaction(["😆", "🥱"]);
   * toRemoveReaction(["😆", "🥱"], { id: "1234871972" });
   *
   * @since 2.0
   */
  toRemoveReaction(emojis: string[], messageIdentifier?: MessageIdentifier): TReturn;

  /**
   * Verify if a command pinned a message.
   *
   * @param messageId Id of the message
   * @since 2.0
   */
  toPin(messageId: string): TReturn;
  /**
   * Verify if a command pinned a message.
   *
   * @param messageIdentifier Object with **id** or **content** of the message.
   * @since 2.0
   */
  toPin(messageIdentifier: MessageIdentifier): TReturn;

  /**
   * Verify if a command unpinned a message.
   *
   * @param messageId Id of the message
   * @since 2.0
   */
  toUnPin(messageId: string): TReturn;
  /**
   * Verify if a command unpinned a message.
   *
   * @param message Object with **id** or **content** of the message.
   * @since 2.0
   */
  toUnPin(messageIdentifier: MessageIdentifier): TReturn;

  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **string** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: string, messageIdentifier?: MessageEditedIdentifier): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **string** value for the message.
   * @param messageId Id of the message.
   * @since 1.0
   */
  toEditMessage(newValue: string, messageId?: string): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **number** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: number, messageIdentifier?: MessageEditedIdentifier): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **number** value for the message.
   * @param messageId Id of the message.
   * @since 1.0
   */
  toEditMessage(newValue: number, messageId?: string): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **bigint** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: bigint, messageIdentifier?: MessageEditedIdentifier): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **bigint** value for the message.
   * @param messageId Id of the message.
   * @since 1.0
   */
  toEditMessage(newValue: bigint, messageId?: string): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **boolean** value for the message.
   * @param messageId Id of the message.
   * @since 1.0
   */
  toEditMessage(newValue: boolean, messageId?: string): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **boolean** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: boolean, messageIdentifier?: MessageEditedIdentifier): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **MessageEmbedLike** value for the message.
   * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: MessageEmbedLike, messageIdentifier?: MessageEditedIdentifier): TReturn;
  /**
   * Verify if a command edited a message.
   *
   * @param newValue New **MessageEmbedLike** value for the message.
   * @param messageId Data object with the **id** or **oldContent** of the message.
   * @since 1.0
   */
  toEditMessage(newValue: MessageEmbedLike, messageId?: string): TReturn;
}

/**
 * Tests for a **Role** structure.
 */
export interface RoleMatches<TReturn extends MayReturnMatch> {
  /**
   * Check if a command changed a role color.
   *
   * @param color The new color for the role.
   * @param roleId Id of the role.
   * @since 2.0
   */
  toSetRoleColor(color: ColorResolvable, roleId: string): TReturn;
  /**
   * Check if a command changed a role color.
   *
   * @param color The new color for the role.
   * @param roleIdentifier Object with the **id** or the **name** of the role.
   * @since 2.0
   */
  toSetRoleColor(color: ColorResolvable, roleIdentifier: RoleIdentifier): TReturn;
  /**
   * Check if a command changed a role color.
   *
   * @param color Color enum in hexadecimal format.
   * @param roleId Object with the **id** or the **name** of the role.
   * @since 2.0
   */
  toSetRoleColor(color: Colors, roleId: string): TReturn;
  /**
   * Check if a command changed a role color.
   *
   * @param color Color enum in hexadecimal format.
   * @param roleId Object with the **id** or the **name** of the role.
   * @since 2.0
   */
  toSetRoleColor(color: Colors, roleIdentifier: RoleIdentifier): TReturn;

  /**
   * Check if a command deletes a role.
   *
   * @param roleId Id of the role.
   * @since 2.0
   */
  toDeleteRole(roleId: string): TReturn;

  /**
   * Check if a command deletes a role.
   *
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @since 2.0
   */
  toDeleteRole(roleIdentifier: RoleIdentifier): TReturn;

  /**
   * Check if a command defines a role as mentionable.
   *
   * @param mentionable If the role can or can not be mentionable.
   * @param roleId Id of the role.
   * @since 2.0
   */
  toSetRoleMentionable(mentionable: boolean, roleId: string): TReturn;
  /**
   * Check if a command define a role as mentionable.
   *
   * @param mentionable If the role can or can not be mentionable.
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @since 2.0
   */
  toSetRoleMentionable(mentionable: boolean, roleIdentifier: RoleIdentifier): TReturn;

  /**
   * Check if a commend defines a role as a hoist.
   *
   * @param hoist if this role is pinned in the user listing.
   * @param roleId Id of the role.
   *
   * @description Discord provides two methods of displaying roles; hoisted and standard.
   * The role hierarchy is visibly clear to server members; roles are sorted and displayed
   * based on which role is higher in the role management menu.
   *
   * However, in a standard configuration, users are sorted alphabetically, meaning someone
   * with the highest role will be sorted wherever their name exists in the alphabet.
   *
   * Source from [discord support](https://support.discord.com/hc/en-us/community/posts/360060076751-Un-hoisted-Role-Hierarchy).
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRoleHoist(hoist: boolean, roleId: string): TReturn;
  /**
   * Check if a commend define a role as hoist.
   *
   * @param hoist if this role is pinned in the user listing.
   * @param roleIdentifier Object with **id** or **name** of the role.
   *
   * @description Discord provides two methods of displaying roles; hoisted and standard.
   * The role hierarchy is visibly clear to server members; roles are sorted and displayed
   * based on which role is higher in the role management menu.
   *
   * However, in a standard configuration, users are sorted alphabetically, meaning someone
   * with the highest role will be sorted wherever their name exists in the alphabet.
   *
   * Source from [discord support](https://support.discord.com/hc/en-us/community/posts/360060076751-Un-hoisted-Role-Hierarchy).
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRoleHoist(hoist: boolean, roleIdentifier: RoleIdentifier): TReturn;

  /**
   * Check if a command renames a role.
   *
   * @param newName new name of the role
   * @param roleId Id of the role.
   * @since 2.0
   */
  toRenameRole(newName: string, roleId: string): TReturn;
  /**
   * Check if a command rename a role.
   *
   * @param newName new name of the role
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @since 2.0
   */
  toRenameRole(newName: string, roleIdentifier: RoleIdentifier): TReturn;

  /**
   * Check if a command changes a role's position.
   *
   * @param newPosition The new position of the role.
   * @param roleId Id of the role.
   *
   * @description Role's maximum value depends on the number of roles the guild Have.
   * So, if there are only 3 roles (including the default *everyone*), the maximum
   * position that a role can have is 2 (The count begins with 0, So: 0, 1, 2).
   *
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRolePosition(newPosition: number, roleId: string): TReturn;
  /**
   * Check if a command change a role's position.
   *
   * @param newPosition The new position of the role.
   * @param roleIdentifier Object with **id** or **name** of the role.
   *
   * @description Role's maximum value depends on the number of roles the guild has.
   * So, if there are only 3 roles (including the default *everyone*), the maximum
   * position that a role can have is 2 (The count begins with 0, So: 0, 1, 2).
   *
   * @see https://discord.com/developers/docs/topics/permissions
   * @since 2.0
   */
  toSetRolePosition(newPosition: number, roleIdentifier: RoleIdentifier): TReturn;

  /**
   * Check if a command change the
   * [permissions](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
   * of a role.
   *
   * @param roleId Id of the role.
   * @param permissions List of permissions allowed by Discord.
   *
   * @see https://discord.com/developers/docs/topics/permissions#permissions
   * @since 2.0
   */
  toSetRolePermission(roleId: string, ...permissions: RolePermission[]): TReturn;
  /**
   * Check if a command change the
   * [permissions](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
   * of a role.
   *
   * @param roleIdentifier Object with **id** or **name** of the role.
   * @param permissions List of permissions allowed by Discord.
   *
   * @see https://discord.com/developers/docs/topics/permissions#permissions
   * @since 2.0
   */
  toSetRolePermission(roleIdentifier: RoleIdentifier, ...permissions: RolePermission[]): TReturn;
}

export interface MacherContructorArgs {
  commandName: unknown;
  isNot?: boolean;
  channelId?: string;
  guildId?: string;
  isCascade?: boolean;
}

export interface CascadeMatch {
  todoInCascade(...tests: TestFunctionType[]): void;
}

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 */
export type Matches<TReturn extends MayReturnMatch> = MessageMatches<TReturn> &
  RoleMatches<TReturn>;

/**
 * Defines the initial value of expectations from
 * **command** function. It includes all matches and
 * the *not* statement. Witch will deny the executed match
 */
export interface IsNot<TMatchesResponse extends any> {
  /**
   * Defines that a command should **not** do something.
   * Use this if you can not precise what response a command will throw,
   * But know what it **can not** throw.
   */
  not: TMatchesResponse;
}

export interface SetChannelMatchers<TReturn extends MayReturnMatch> {
  /**
   * Specify a channel where tests will be **validated** on.
   *
   * @example
   *
   * // Suposing that the config is:
   * const cordeConfig = {
   *  channelId: "123",
   *  botPrefix: "!"
   * };
   *
   * expect("ping").inChannel("321").toReturn("pong");
   *
   * @description This will send the message "!ping" in the channel defined in configs("123"),
   * and check if a message with content "pong" will be sent to the text channel of if "321".
   *
   * @param id Id of the channel
   */
  inChannel(id: string): IsNot<MessageMatches<TReturn>> & MessageMatches<TReturn>;
}

export interface SetGuildMatchers<TReturn extends MayReturnMatch> {
  /**
   * Specify a guild where tests will be **validated** in.
   *
   * @example
   *
   * // Suposing that the config is:
   * const cordeConfig = {
   *  guildId: "123",
   *  botPrefix: "!"
   * };
   *
   * expect("ping").inGuild("321").toReturn("pong");
   *
   * @description This will send the message "!ping" in the channel defined in configs("123"),
   * and check if a message with content "pong" will be sent to the text channel of if "321".
   *
   * @param id Id of the channel
   */
  inGuild(id: string): IsNot<RoleMatches<TReturn>> & RoleMatches<TReturn>;
}

export type AllMatches<TReturn extends MayReturnMatch> = SetChannelMatchers<TReturn> &
  SetGuildMatchers<TReturn> &
  IsNot<Matches<TReturn>> &
  Matches<TReturn>;

export interface Expect extends AllMatches<any> {
  /**
   * Receives which command will be tested.
   *
   * Do not inform the command prefix if
   * it's already informed in **configs**
   *
   * @param commandNameResolvable Command name. (Empty strings will resolve failed test)
   *
   * @returns An object with all possible tests to be done
   * in the bot.
   *
   * @since 1.0
   */
  <T extends (() => number | string) | number | string>(commandNameResolvable: T): AllMatches<void>;
}
