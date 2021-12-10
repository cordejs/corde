declare const command: corde.ICommand;
/**
 * Shortcut for `command`
 */
declare const con: typeof command;

declare namespace corde {
  /**
   * Defines all functions that can be used
   * to check a bot reaction of a command.
   */
  export type CommandMatchers<TReturn extends any> = IMessageMatches<TReturn> &
    IRoleMatches<TReturn>;

  /**
   * Defines the initial value of expectations from
   * **command** function. It includes all matches and
   * the *not* statement. Which will deny the executed match
   */
  export interface IIsNot<TMatchesResponse extends any, TResponse2 = void> {
    /**
     * Defines that command should **not** do something.
     * Use this if you can not precise what response a command will throw,
     * But know what it **can not** throw.
     */
    not: TMatchesResponse & TResponse2;
  }

  export type InChannelMatches<TReturn extends any> = IIsNot<IMessageMatches<TReturn>> &
    IMessageMatches<TReturn>;

  export type InGuildMatches<TReturn extends any> = IIsNot<IRoleMatches<TReturn>> &
    IRoleMatches<TReturn>;

  export interface ISetGuildMatchers<TReturn extends any> {
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
     * expect("ping").inGuild("321").toRenameRole("new name", "1231241");
     *
     * @description This will send the message "!ping" in the channel defined in configs("123"),
     * and check if a message with content "pong" will be sent to the text channel of if "321".
     *
     * @param id Id of the channel
     */
    inGuild(id: string): InGuildMatches<TReturn>;
  }

  export interface ICommandPromise extends Promise<void> {
    and: AllCommandMatches;
  }

  export type MayReturnMatch = CommandMatchers<any> | ICommandPromise;

  /**
   * Defines all functions that can be used
   * to check a bot reaction of a command.
   *
   */
  export interface IMessageMatches<TReturn extends any> {
    /**
     * Defines the message expected to be returned by a
     * command.
     *
     * @param expect A message returned by a bot after invoking a command
     *
     * @since 1.0
     */
    respond(expect: boolean | number | string | IMessageEmbed): TReturn;
    /**
     * Defines [reactions](https://discordjs.guide/popular-topics/reactions.html#reacting-to-messages)
     * that must be added to the command message.
     *
     * @param emojis Single or list of reactions that must be added to a message.
     * It can be **emojis** or [custom emojis](https://support.discord.com/hc/en-us/articles/360036479811-Custom-Emojis).
     * @param messageIdentifier Id or object with the id or content of the message.
     *
     * @since 1.0
     */
    addReaction(
      emojis: string[] | IEmoji[] | (string | IEmoji)[],
      messageIdentifier?: string | IMessageIdentifier,
    ): TReturn;

    /**
     * Check if a command removes a list of reactions from the last message sent
     * by someone who is not the testing bot or corde's bot.
     *
     * @param emojis Reactions to check if were removed. And/or reactions like (reactions that are customized).
     * @param messageIdentifier Id or object with the id or content of the message.
     *
     * @since 2.0
     */
    removeReaction(
      emojis: string[] | IEmoji[] | (string | IEmoji)[],
      messageIdentifier?: string | IMessageIdentifier,
    ): TReturn;

    /**
     * Verify if a command pinned a message.
     *
     * @param messageId Id of the message
     *
     * @since 2.0
     */
    pin(messageId: string): TReturn;
    /**
     * Verify if a command pinned a message.
     *
     * @param messageIdentifier Object with **id** or **content** of the message.
     *
     * @since 2.0
     */
    pin(messageIdentifier: IMessageIdentifier): TReturn;

    /**
     * Verify if a command unpinned a message.
     *
     * @param messageId Id of the message
     * @param channelId Alternative channel that corde must check where the message will be pinned
     *
     * @since 2.0
     */
    unPin(messageId: string): TReturn;
    /**
     * Verify if a command unpinned a message.
     *
     * @param message Object with **id** or **content** of the message.
     *
     * @since 2.0
     */
    unPin(messageIdentifier: IMessageIdentifier): TReturn;

    /**
     * Verify if a command edited a message.
     *
     * @param newValue New value for the message.
     * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
     *
     * @since 1.0
     */
    editMessage(
      newValue: string | number | boolean | IMessageEmbed,
      messageIdentifier?: string | IMessageEditedIdentifier,
    ): TReturn;

    /**
     * Verify if an embed message matches with the embed message sent by the bot
     * giving a command.
     *
     * @example
     *
     * // giving the returned embed of the command "embed"
     *
     *  {
     *    color: "#0099ff",
     *    title: "some one",
     *    description: "Some description here"
     *  }
     *
     *  // The follow test will pass because we are only cheching if the returning embed
     *  // has the color property equals.
     *
     *  expect("embed").toEmbedMatch({ color: "#0099ff" }); // Test pass
     *
     * @param embed Embed message to check with returned embed of an command.
     * @since 4.0
     */
    embedMatch(embed: IMessageEmbed): TReturn;

    /**
     * Verify if a sent message **contains** the value informed in `expectedContent`.
     *
     * @example
     *
     * // Given the command "ping" that return "pong"
     *
     * expect("ping").toMessageContentContains("pon"); // Pass
     *
     *
     * @param expectedContent expected content to match the content of the returned message.
     * @since 4.0
     */
    messageContentContains(expectedContent: string): TReturn;
  }

  /**
   * Tests for a **Role** structure.
   */
  export interface IRoleMatches<TReturn extends any> {
    /**
     * Check if a command changed a role color.
     *
     * @param color The new color for the role.
     * @param roleId Id of the role.
     *
     * @since 2.0
     */
    setRoleColor(color: ColorResolvable, roleId: string): ICommandPromise;
    /**
     * Check if a command changed a role color.
     *
     * @param color The new color for the role.
     * @param roleIdentifier Object with the **id** or the **name** of the role.
     *
     * @since 2.0
     */
    setRoleColor(color: corde.ColorResolvable, roleIdentifier: IRoleIdentifier): TReturn;
    /**
     * Check if a command changed a role color.
     *
     * @param color Color enum in hexadecimal format.
     * @param roleId Object with the **id** or the **name** of the role.
     *
     * @since 2.0
     */
    setRoleColor(color: corde.ColorResolvable, roleId: string): TReturn;
    /**
     * Check if a command changed a role color.
     *
     * @param color Color enum in hexadecimal format.
     * @param roleIdentifier Object with the **id** or the **name** of the role.
     *
     * @since 2.0
     */
    setRoleColor(color: corde.ColorResolvable, roleIdentifier: IRoleIdentifier): TReturn;

    /**
     * Check if a command deletes a role.
     * @param roleId Id of the role.
     * @since 2.0
     */
    deleteRole(roleId: string): TReturn;

    /**
     * Check if a command deletes a role.
     * @param roleIdentifier Object with **id** or **name** of the role
     * @since 2.0
     */
    deleteRole(roleIdentifier: IRoleIdentifier): TReturn;

    /**
     * Check if a command defines a role as mentionable.
     *
     * @param mentionable If the role can or can not be mentionable.
     * @param roleId Id of the role.
     *
     * @since 2.0
     */
    setRoleMentionable(mentionable: boolean, roleId: string): TReturn;
    /**
     * Check if a command defines a role as mentionable.
     *
     * @param mentionable If the role can or can not be mentionable.
     * @param roleIdentifier Object with **id** or **name** of the role.
     *
     * @since 2.0
     */
    setRoleMentionable(mentionable: boolean, roleIdentifier: IRoleIdentifier): TReturn;

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
    setRoleHoist(hoist: boolean, roleId: string): TReturn;
    /**
     * Check if a commend defines a role as a hoist.
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
    setRoleHoist(hoist: boolean, roleIdentifier: IRoleIdentifier): TReturn;

    /**
     * Check if a command renames a role.
     *
     * @param newName new name of the role
     * @param roleId Id of the role.
     *
     * @since 2.0
     */
    renameRole(newName: string, roleId: string): TReturn;
    /**
     * Check if a command renames a role.
     *
     * @param newName new name of the role
     * @param roleIdentifier Object with **id** or **name** of the role
     *
     * @since 2.0
     */
    renameRole(newName: string, roleIdentifier: IRoleIdentifier): TReturn;

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
    setRolePosition(newPosition: number, roleId: string): TReturn;
    /**
     * Check if a command changes a role's position.
     *
     * @param newPosition The new position of the role.
     * @param roleIdentifier Object with **id** or **name** of the role.
     *
     *
     * @description Role's maximum value depends on the number of roles the guild has.
     * So, if there are only 3 roles (including the default *everyone*), the maximum
     * position that a role can have is 2 (The count begins with 0, So: 0, 1, 2).
     *
     * @see https://discord.com/developers/docs/topics/permissions
     * @since 2.0
     */
    setRolePosition(newPosition: number, roleIdentifier: IRoleIdentifier): TReturn;

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
    setRolePermission(roleId: string, ...permissions: RolePermission[]): TReturn;
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
    setRolePermission(roleIdentifier: IRoleIdentifier, ...permissions: RolePermission[]): TReturn;
  }

  export interface ISetChannelMatchers<TReturn extends any> {
    /**
     * Specify a channel where tests will be **validated** in.
     *
     * @example
     *
     * // Suposing that the config is:
     * const cordeConfig = {
     *  channelId: "123",
     *  botPrefix: "!"
     * };
     *
     * expect("ping").inChannel("321").shouldReturn("pong");
     *
     * @description This will send the message "!ping" in the channel defined in configs("123"),
     * and check if a message with content "pong" will be sent to the text channel of if "321".
     *
     * @param id Id of the channel
     */
    inChannel(id: string): InChannelMatches<TReturn>;
  }

  type IsNotWithHaveResults = IIsNot<CommandMatchers<Promise<void>>>;

  export type AllMatches<TReturn extends any> = IIsNot<CommandMatchers<any>> &
    CommandMatchers<TReturn> &
    ISetChannelMatchers<TReturn> &
    ISetGuildMatchers<TReturn>;

  export type AllCommandMatches = CommandMatchers<Promise<void>> &
    IsNotWithHaveResults &
    ISetChannelMatchers<ICommandPromise> &
    ISetGuildMatchers<ICommandPromise>;

  export interface IShouldCommands {
    should: AllCommandMatches;
  }

  export interface ICommand extends AllMatches<any> {
    /**
     * Receives which command will be tested.
     *
     * Do not inform the command prefix if
     * it's already informed in **configs**
     *
     * @param commandNameResolvable Command name. (Empty strings will resolve failed test)
     * @param channelId Defines the channel where the command should be sent to.
     *
     * @returns An object with all possible tests to be done
     * in the bot.
     *
     * @since 1.0
     */
    <T extends (() => number | string) | number | string>(
      commandNameResolvable: T,
      channelId?: string,
    ): IShouldCommands;
  }
}
