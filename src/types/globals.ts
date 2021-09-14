import {
  ColorResolvable,
  Colors,
  IEmoji,
  IMessageEditedIdentifier,
  IMessageEmbed,
  IMessageIdentifier,
  IRoleIdentifier,
  RolePermission,
} from "./general";

export namespace corde {
  type KeyOf<T> = keyof T;

  export type FunctionOnly<T> = {
    [K in KeyOf<T>]: T[K] extends (...args: any[]) => any ? K : never;
  }[KeyOf<T>];

  export type PropOnly<T> = {
    [K in KeyOf<T>]: T[K] extends (...args: any[]) => any ? never : K;
  }[KeyOf<T>];

  export interface IMatchersWithNot<T extends any> extends IMatchers<T> {
    not: IMatchers<T>;
  }

  export interface IMatchers<T extends any> {
    /**
     * Checks if a `expected` value is identical to a `value`.
     *
     * This functions uses `===` to match `expected` and `value`.
     *
     * If you only want to assert values equality and not their,
     * identity, use **toEqual**.
     *
     * @example
     *
     * expect(1).toBe(1); // Pass
     * expect({}).toBe({}) // Fail (different identities)
     *
     * @param value Value to compare with `expected`
     * @since 5.0
     */
    toBe(value: T): void;
    /**
     * Checks if a `expected` value is deep equal to a `value`;
     *
     * If you want to check identity of two objects, use **toBe**.
     *
     * @example
     *
     * expect(1).toEqual(1); // Pass
     * expect({}).toEqual({}) // Pass (Equal objects)
     *
     * @param value Value to compare with `expected`
     * @since 5.0
     */
    toEqual(value: T): void;
    toBeCloseTo(expected: T, precisionopt: number): void;
    /**
     * Checks if `expected` has a defined value (is not `null` or `undefined`).
     * @since 5.0
     */
    toBeDefined(): void;
    /**
     * Checks if ``expected`` has a boolean equality value that results in false.
     *
     * @example
     *
     * expect(0).toBeFalsy() // Pass
     * expect(null).toBeFalsy() // Pass
     * expect(undefined).toBeFalsy() // Pass
     * expect("").toBeFalsy() // Pass
     * expect(false).toBeFalsy() // Pass
     *
     * @since 5.0
     */
    toBeFalsy(): void;
    /**
     * Checks if `expected` is a primitive value.
     *
     * @example
     *
     * expect("").toBePrimitive() // Pass
     * expect(1).toBePrimitive() // Pass
     * expect(false).toBePrimitive() // Pass
     * expect({}).toBePrimitive() // False
     *
     * @since 5.0
     */
    toBePrimitive(): void;
    /**
     * Checks if `expected` is greater than `value`.
     * @param value Value to compare with `expected` using `>`.
     *
     * @example
     *
     * expect(1).toBeGreaterThan(0) // Pass
     *
     * @since 5.0
     */
    toBeGreaterThan(value: number | bigint): void;
    /**
     * Checks if `expected` is greater or equal than `value`.
     * @param value Value to compare with `expected` using `>=`.
     *
     * @example
     *
     * expect(1).toBeGreaterOrEqualThan(0) // Pass
     * expect(1).toBeGreaterOrEqualThan(1) // Pass
     *
     * @since 5.0
     */
    toBeGreaterOrEqualThan(value: number | bigint): void;
    /**
     * Checks if `value` is of instance of `type`.
     * @param type Type of instance to compare with `expected`
     *
     * @example
     *
     * class User {}
     *
     * expect(new User()).toBeInstanceOf(User);
     *
     * @since 5.0
     */
    toBeInstanceOf<U>(type: U | T): void;
    /**
     * Checks if `expected` is less than `value`.
     * @param value Value to compare with `expected` using `<`.
     *
     * @example
     *
     * expect(0).toBeLessThan(1) // Pass
     *
     * @since 5.0
     */
    toBeLessThan(expected: number | bigint): void;
    /**
     * Checks if `expected` is less or equal than `value`.
     * @param value Value to compare with `expected` using `<=`.
     *
     * @example
     *
     * expect(1).toBeLessOrEqualThan(2) // Pass
     * expect(1).toBeLessOrEqualThan(1) // Pass
     *
     * @since 5.0
     */
    toBeLessOrEqualThan(expected: number | bigint): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * NaN
     * ```
     *
     * @example
     *
     * expect(NaN).toBeNaN() // Pass
     *
     * @since 5.0
     */
    toBeNaN(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * null || undefined
     * ```
     *
     * @example
     *
     * expect(null).toBeNothing() // Pass
     * expect(undefined).toBeNothing() // Pass
     *
     * @since 5.0
     */
    toBeNothing(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Number.NEGATIVE_INFINITY || -Number.MAX_VALUE * 2
     * ```
     *
     * @example
     *
     * expect(Number.NEGATIVE_INFINITY).toBeNegativeInfinity() // Pass
     * expect(-1).toBeNegativeInfinity() // Fail
     *
     * @since 5.0
     */
    toBeNegativeInfinity(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * null
     * ```
     *
     * @example
     *
     * expect(null).toBeNull() // Pass
     * expect(undefined).toBeNull() // Fail
     *
     * @since 5.0
     */
    toBeNull(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * undefined
     * ```
     *
     * @example
     *
     * expect(undefined).toBeUndefined() // Pass
     * expect(null).toBeUndefined() // Fail
     *
     * @since 5.0
     */
    toBeUndefined(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Number.POSITIVE_INFINITY
     * ```
     *
     * @example
     *
     * expect(Number.POSITIVE_INFINITY).toBePositiveInfinity() // Pass
     * expect(1).toBePositiveInfinity() // Fail
     *
     * @since 5.0
     */
    toBePositiveInfinity(): void;
    /**
     * Checks if `expected` is a **boolean** with value **true**.
     *
     * ```javascript
     * Boolean = true
     * ```
     *
     * @example
     *
     * expect(true).toBeTrue() // Pass
     * expect({}).toBeTrue() // Fail
     * expect(false).toBeTrue() // Fail
     *
     * @since 5.0
     *
     */
    toBeTrue(): void;
    /**
     * Checks if `expected` is a **boolean** with value **false**.
     *
     * ```javascript
     * Boolean = false
     * ```
     *
     * @example
     *
     * expect(false).toBeFalse() // Pass
     * expect({}).toBeFalse() // Fail
     * expect(true).toBeFalse() // Pass
     *
     * @since 5.0
     *
     */
    toBeFalse(): void;
    /**
     * Checks if ``expected`` has a boolean equality value that results in true.
     *
     * @example
     *
     * expect(1).toBeTruthy() // Pass
     * expect({}).toBeTruthy() // Pass
     * expect([]).toBeTruthy() // Pass
     * expect("111").toBeTruthy() // Pass
     * expect(true).toBeTruthy() // Pass
     *
     * @since 5.0
     */
    toBeTruthy(): void;
    toContain(expected: T): void;
    toHaveBeenCalled(): void;
    toHaveBeenCalledBefore(expected: any): void;
    toHaveBeenCalledOnceWith(): void;
    toHaveBeenCalledTimes(amount: number): void;
    toHaveBeenCalledWith(): void;
    toMatch(expected: any): void;
    toThrow<U extends any>(expectedThrow: U): void;
    toThrowError<U extends Error>(expectedopt: U): void;
    toBeArrayOfBooleans(): void;
    toBeArrayOfNumbers(): void;
    toBeArrayOfObjects(): void;
    toBeArrayOfStrings(): void;
    toBeArrayOfSize(number: any): void;
    /**
     * Checks if `value` is an empty array.
     *
     * @example
     *
     * expect([]).toBeEmptyArray() // Pass
     *
     * @since 5.0
     */
    toBeEmptyArray(): void;
    toBeNonEmptyArray(): void;
    toBeAfter(otherDate: Date): void;
    toBeBefore(otherDate: Date): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Date
     * ```
     *
     * This function do not check if the date object is **valid**.
     * To do so use **toBeValidDate**.
     *
     * @example
     *
     * expect(new Date()).toBeDate() // Pass
     * expect(new Date("bb")).toBeDate() // (Invalid date, but pass)
     *
     * @since 5.0
     */
    toBeDate(): void;
    /**
     * Checks if `expected` is a valid value of:
     *
     * ```javascript
     * Date
     * ```
     *
     * @example
     *
     * expect(new Date()).toBeDate() // Pass
     * expect(new Date("bb")).toBeDate() // Fail. Invalid date.
     */
    toBeValidDate(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Function
     * ```
     *
     * @example
     *
     * expect(() => null).toBeFunction() // Pass
     *
     * @since 5.0
     */
    toBeFunction(): void;
    toThrowAnyError(): void;
    toThrowErrorOfType(constructorName: any): void;
    toBeNear(otherNumber: number | bigint, epsilon: any): void;
    toBeOddNumber(): void;
    toBeWithinRange(floor: any, ceiling: any): void;
    toBeEmptyObject(): void;
    toBeNonEmptyObject(): void;
    toBeRegExp(): void;
    toBeEmptyString(): void;
    toBeHtmlString(): void;
    toBeJsonString(): void;
    toBeLongerThan(otherString: string): void;
    toBeNonEmptyString(): void;
    toBeSameLengthAs(otherString: string): void;
    toBeShorterThan(otherString: string): void;
    /**
     * Checks if `expected` has the length defined in `length`.
     * Only works with:
     *
     * ```javascript
     * String || Array
     * ```
     *
     * @param length Value to compare with `expected` size.
     *
     * @example
     *
     * expect("").toLength(0) // Pass
     * expect([1, 2, 3]).toLength(3) // Pass
     *
     * @since 5.0
     */
    toLength(length: number): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * String
     * ```
     *
     * @example
     *
     * expect("undefined").toBeString() // Pass
     *
     * @since 5.0
     */
    toBeString(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Number
     * ```
     *
     * @example
     *
     * expect(1).toBeNumber() // Pass
     *
     * @since 5.0
     */
    toBeNumber(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * BigInt
     * ```
     *
     * @example
     *
     * expect(9007199254740991n).toBeBigInt() // Pass
     *
     * @since 5.0
     */
    toBeBigInt(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Array
     * ```
     *
     * @example
     *
     * expect([]).toBeArray() // Pass
     *
     * @since 5.0
     */
    toBeArray(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Object
     * ```
     *
     * @example
     *
     * expect({}).toBeObject() // Pass
     *
     * @since 5.0
     */
    toBeObject(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Symbol
     * ```
     *
     * @example
     *
     * expect(Symbol.for("")).toBeSymbol() // Pass
     *
     * @since 5.0
     */
    toBeSymbol(): void;
    /**
     * Checks if `expected` is:
     *
     * ```javascript
     * Boolean
     * ```
     *
     * @example
     *
     * expect(true).toBeBoolean() // Pass
     * expect(false).toBeBoolean() // Pass
     *
     * @since 5.0
     */
    toBeBoolean(): void;
    toBeWhitespace(): void;
    toEndWith(substring: string): void;
    toStartWith(substring: string): void;
  }

  export interface IExpect {
    <T extends any>(value: T): IMatchersWithNot<T>;
    any(...classType: any[]): any;
  }

  export interface IHook {
    (fn: () => void | Promise<void>, timeout?: number): void;
  }

  export interface IDescribeClousure {
    <T extends unknown>(
      definitionResolvable: T,
      testDefinitions: (() => void) | (() => Promise<void>),
    ): void;
  }

  export interface ITestClousure {
    <T extends unknown>(
      definitionResolvable: T,
      testDefinitions: (() => void) | (() => Promise<void>),
      timeout?: number | undefined,
    ): void;
  }

  /**
   * Defines all functions that can be used
   * to check a bot reaction of a command.
   */
  export type IMatches<TReturn extends MayReturnMatch> = IMessageMatches<TReturn> &
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

  // We intentionally hide the real type of parameters are passed to todoInCasdade,
  // to hide the implementation from the user.
  export interface IToHaveResult {
    /**
     * Execute multiple assertions based on a single command.
     *
     * @example
     *
     * expect("command").toHaveResult(
     *  expect.shouldReturn("hello1"),
     *  expect.shouldReturn("hello2", "123124124")
     * );
     *
     * @param tests
     */
    toHaveResult(...tests: any[]): void;
  }

  export type InChannelMatches<TReturn extends MayReturnMatch> = IIsNot<IMessageMatches<TReturn>> &
    IMessageMatches<TReturn>;

  export type InGuildMatches<TReturn extends MayReturnMatch> = IIsNot<IRoleMatches<TReturn>> &
    IRoleMatches<TReturn>;

  export interface ISetGuildMatchers<TReturn extends MayReturnMatch> {
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

  export type MayReturnMatch = IMatches<any> | void;

  /**
   * Defines all functions that can be used
   * to check a bot reaction of a command.
   *
   */
  export interface IMessageMatches<TReturn extends MayReturnMatch> {
    /**
     * Defines the message expected to be returned by a
     * command.
     *
     * @param expect A message returned by a bot after invoking a command
     *
     * @since 1.0
     */
    shouldReturn(expect: boolean | number | string | IMessageEmbed): Promise<TReturn>;
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
    shouldAddReaction(
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
    shouldRemoveReaction(
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
    shouldPin(messageId: string): TReturn;
    /**
     * Verify if a command pinned a message.
     *
     * @param messageIdentifier Object with **id** or **content** of the message.
     *
     * @since 2.0
     */
    shouldPin(messageIdentifier: IMessageIdentifier): TReturn;

    /**
     * Verify if a command unpinned a message.
     *
     * @param messageId Id of the message
     * @param channelId Alternative channel that corde must check where the message will be pinned
     *
     * @since 2.0
     */
    shouldUnPin(messageId: string): TReturn;
    /**
     * Verify if a command unpinned a message.
     *
     * @param message Object with **id** or **content** of the message.
     *
     * @since 2.0
     */
    shouldUnPin(messageIdentifier: IMessageIdentifier): TReturn;

    /**
     * Verify if a command edited a message.
     *
     * @param newValue New value for the message.
     * @param messageIdentifier Data object with the **id** or **oldContent** of the message.
     *
     * @since 1.0
     */
    shouldEditMessage(
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
    shouldEmbedMatch(embed: IMessageEmbed): TReturn;

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
    shouldMessageContentContains(expectedContent: string): TReturn;
  }

  /**
   * Tests for a **Role** structure.
   */
  export interface IRoleMatches<TReturn extends MayReturnMatch> {
    /**
     * Check if a command changed a role color.
     *
     * @param color The new color for the role.
     * @param roleId Id of the role.
     *
     * @since 2.0
     */
    shouldSetRoleColor(color: ColorResolvable, roleId: string): TReturn;
    /**
     * Check if a command changed a role color.
     *
     * @param color The new color for the role.
     * @param roleIdentifier Object with the **id** or the **name** of the role.
     *
     * @since 2.0
     */
    shouldSetRoleColor(color: ColorResolvable, roleIdentifier: IRoleIdentifier): TReturn;
    /**
     * Check if a command changed a role color.
     *
     * @param color Color enum in hexadecimal format.
     * @param roleId Object with the **id** or the **name** of the role.
     *
     * @since 2.0
     */
    shouldSetRoleColor(color: Colors, roleId: string): TReturn;
    /**
     * Check if a command changed a role color.
     *
     * @param color Color enum in hexadecimal format.
     * @param roleIdentifier Object with the **id** or the **name** of the role.
     *
     * @since 2.0
     */
    shouldSetRoleColor(color: Colors, roleIdentifier: IRoleIdentifier): TReturn;

    /**
     * Check if a command deletes a role.
     * @param roleId Id of the role.
     * @since 2.0
     */
    shouldDeleteRole(roleId: string): TReturn;

    /**
     * Check if a command deletes a role.
     * @param roleIdentifier Object with **id** or **name** of the role
     * @since 2.0
     */
    shouldDeleteRole(roleIdentifier: IRoleIdentifier): TReturn;

    /**
     * Check if a command defines a role as mentionable.
     *
     * @param mentionable If the role can or can not be mentionable.
     * @param roleId Id of the role.
     *
     * @since 2.0
     */
    shouldSetRoleMentionable(mentionable: boolean, roleId: string): TReturn;
    /**
     * Check if a command defines a role as mentionable.
     *
     * @param mentionable If the role can or can not be mentionable.
     * @param roleIdentifier Object with **id** or **name** of the role.
     *
     * @since 2.0
     */
    shouldSetRoleMentionable(mentionable: boolean, roleIdentifier: IRoleIdentifier): TReturn;

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
    shouldSetRoleHoist(hoist: boolean, roleId: string): TReturn;
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
    shouldSetRoleHoist(hoist: boolean, roleIdentifier: IRoleIdentifier): TReturn;

    /**
     * Check if a command renames a role.
     *
     * @param newName new name of the role
     * @param roleId Id of the role.
     *
     * @since 2.0
     */
    shouldRenameRole(newName: string, roleId: string): TReturn;
    /**
     * Check if a command renames a role.
     *
     * @param newName new name of the role
     * @param roleIdentifier Object with **id** or **name** of the role
     *
     * @since 2.0
     */
    shouldRenameRole(newName: string, roleIdentifier: IRoleIdentifier): TReturn;

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
    shouldSetRolePosition(newPosition: number, roleId: string): TReturn;
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
    shouldSetRolePosition(newPosition: number, roleIdentifier: IRoleIdentifier): TReturn;

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
    shouldSetRolePermission(roleId: string, ...permissions: RolePermission[]): TReturn;
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
    shouldSetRolePermission(
      roleIdentifier: IRoleIdentifier,
      ...permissions: RolePermission[]
    ): TReturn;
  }

  export interface ISetChannelMatchers<TReturn extends MayReturnMatch> {
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

  type IsNotWithHaveResults = IIsNot<IMatches<void>, IToHaveResult>;

  export type AllMatches<TReturn extends MayReturnMatch> = IIsNot<IMatches<any>> &
    IMatches<TReturn> &
    ISetChannelMatchers<TReturn> &
    ISetGuildMatchers<TReturn>;

  export type AllCommandMatches = IMatches<void> &
    IToHaveResult &
    IsNotWithHaveResults &
    ISetChannelMatchers<void> &
    ISetGuildMatchers<void>;

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
    ): AllCommandMatches;
  }
}
