declare const expect: corde.IExpect;

/**
 * Declare a bunch of code that will be executed **after** tests begin
 *
 * More than one declaration of this code results in a list
 * of functions to run.
 *
 * They will be executed following a sequence of files
 * reads and the positions of each `afterAll` call.
 *
 * @example
 * // The main function of this is to start a bot if you haven't started it yet
 *
 * const bot = new Discord.Client();
 * afterAll(() => {
 *   bot.destroy();
 * });
 *
 * @param fn Code that will be executed **after** tests start
 * @param timeout Time that Corde should wait for the execution of this function.
 * **it overrides the timeout defined in configs**.
 *
 * @since 1.0
 */
declare const afterAll: corde.IHook;
/**
 * Declare a bunch of code that will be executed before tests begin.
 *
 * More than one declaration of this code results in a list
 * of functions to run.
 *
 * They will be executed following a sequence of files
 * reads and the positions of each `afterAll` call.
 *
 * @example
 * // The main function of this is to start a bot if you haven't started it yet
 *
 * const bot = new Discord.Client();
 * beforeStart(async () => {
 *   await bot.login(config.botToken);
 * });
 *
 * @param fn code that will be executed **before** tests start.
 * @param timeout Time that Corde should wait for the execution of this function.
 * **it overrides the timeout defined in configs**.
 *
 * @since 1.0
 */
declare const beforeAll: corde.IHook;
/**
 * Declare a bunch of code that will be executed before each test begin
 *
 * They will be executed following a sequence of files
 * reads and the positions of each `beforeEach` call.
 *
 * @param fn code that will be executed **before** tests start
 * @param timeout Time that Corde should wait for the execution of this function.
 * **it overrides the timeout defined in configs**.
 *
 * @since 2.0
 */
declare const beforeEach: corde.IHook;
/**
 * Declare a bunch of code that will be executed **after each** test.
 *
 * More than one declaration of this code results in a list
 * of functions to run, following a sequence of files
 * reads and the positions of each `afterEach` call.
 *
 * @param fn code that will be executed **after each** tests finish
 * @param timeout Time that Corde should wait for the execution of this function.
 * **it overrides the timeout defined in configs**.
 *
 * @since 2.0
 */
declare const afterEach: corde.IHook;

declare const group: corde.IDescribeClousure;
declare const describe: corde.IDescribeClousure;

declare const it: corde.ITestClousure;
declare const test: corde.ITestClousure;

declare namespace corde {
  type FunctionOnly<T> = {
    [K in KeyOf<T>]: T[K] extends (...args: any[]) => any ? K : never;
  }[KeyOf<T>];

  type PropOnly<T> = {
    [K in KeyOf<T>]: T[K] extends (...args: any[]) => any ? never : K;
  }[KeyOf<T>];

  type KeyOf<T> = KeyOf<T>;

  export interface IMatchersWithNot<T extends any> extends IMatchers<T> {
    /**
     * Deny some assertion.
     *
     * @example
     *
     * expect(1).toBeNumber() // Pass
     * expect(1).not.toBeNumber() // Fail
     *
     * @since 5.0
     */
    not: IMatchers<T>;
  }

  export interface IMatchers<T extends any> {
    toBe(expected: T): void;
    toEqual(expected: T): void;
    toBeCloseTo(expected: T, precisionopt: number): void;
    toBeDefined(): void;
    toBeFalse(): void;
    toBeFalsy(): void;
    /**
     * Checks if `expected` value is greater than `received` value.
     *
     * @param expected Number to compare to `expected`
     *
     * @example
     *
     * expect(10).toBeGreaterThan(5);
     * expect(10).toBeGreaterThan(expect.any(Number));
     * expect(expect.any(Number)).toBeGreaterThan(1);
     *
     * @since 5.0
     */
    toBeGreaterThan(expected: number | bigint): void;
    toBeGreaterThanOrEqual(expected: number | bigint): void;
    toBeInstanceOf<U extends any>(expected: T | U): void;
    toBeLessThan(expected: number | bigint): void;
    toBeLessThanOrEqual(expected: number | bigint): void;
    toBeNaN(): void;
    toBeNegativeInfinity(): void;
    toBeNull(): void;
    toBeUndefined(): void;
    toBePositiveInfinity(): void;
    toBeTrue(): void;
    toBeTruthy(): void;
    toContain(expected: T): void;
    toHaveBeenCalled(): void;
    toHaveBeenCalledBefore(expected): void;
    toHaveBeenCalledOnceWith(): void;
    toHaveBeenCalledTimes(amount: number): void;
    toHaveBeenCalledWith(): void;
    toHaveClass(expected): void;
    toHaveSize(size: number): void;
    toMatch(expected): void;
    toThrow<U extends any>(expectedThrow: U): void;
    toThrowError<U extends Error>(expectedopt: U): void;
    toThrowMatching(predicate): void;
    any(constructor: any): void;
    anything(mixed: any): void;
    arrayContaining(mixed): void;
    objectContaining(mixed): void;
    stringMatching(pattern): void;
    toBeArrayOfBooleans(): void;
    toBeArrayOfNumbers(): void;
    toBeArrayOfObjects(): void;
    toBeArrayOfSize(number): void;
    toBeArrayOfStrings(): void;
    /**
     * Checks if `received` is an array with `length === 0`.
     *
     * @example
     *
     * expected([]).toBeEmptyArray() // Ok
     *
     * @since 5.0
     */
    toBeEmptyArray(): void;
    toBeNonEmptyArray(): void;
    toBeAfter(otherDate: Date): void;
    toBeBefore(otherDate: Date): void;
    toBeDate(): void;
    toBeValidDate(): void;
    /**
     * Checks if *received* is of type `function`.
     * Can also be replaced by:
     *
     * ```javascript
     * expect(() => null).toBe(expect.any(Function))
     * ```
     *
     * @example
     *
     * expect(() => null).toBeString()
     *
     * @since 5.0
     */
    toBeFunction(): void;
    toThrowAnyError(): void;
    toThrowErrorOfType(constructorName): void;
    toBeCalculable(): void;
    toBeEvenNumber(): void;
    toBeGreaterThanOrEqualTo(otherNumber: number | bigint): void;
    toBeLessThanOrEqualTo(otherNumber: number | bigint): void;
    toBeNear(otherNumber: number | bigint, epsilon): void;
    toBeOddNumber(): void;
    toBeWholeNumber(): void;
    toBeWithinRange(floor, ceiling): void;
    toBeEmptyObject(): void;
    toBeNonEmptyObject(): void;
    toHaveArray(memberName): void;
    toHaveArrayOfBooleans(memberName): void;
    toHaveArrayOfNumbers(memberName): void;
    toHaveArrayOfObjects(memberName): void;
    toHaveArrayOfSize(memberName, size): void;
    toHaveArrayOfStrings(memberName): void;
    toHaveBoolean(memberName): void;
    toHaveCalculable(memberName): void;
    toHaveDate(memberName): void;
    toHaveDateAfter(memberName, date): void;
    toHaveDateBefore(memberName, date): void;
    toHaveEmptyArray(memberName): void;
    toHaveEmptyObject(memberName): void;
    toHaveEmptyString(memberName): void;
    toHaveEvenNumber(memberName): void;
    toHaveFalse(memberName): void;
    toHaveHtmlString(memberName): void;
    toHaveIso8601(memberName): void;
    toHaveJsonString(memberName): void;
    toHaveMember(memberName): void;
    toHaveMethod(memberName: FunctionOnly<T>): void;
    toHaveNonEmptyArray(memberName: PropOnly<T>): void;
    toHaveNonEmptyObject(memberName: PropOnly<T>): void;
    toHaveNonEmptyString(memberName: PropOnly<T>): void;
    toHaveNumber(memberName: PropOnly<T>): void;
    toHaveNumberWithinRange(memberName, floor, ceiling): void;
    toHaveObject(memberName: PropOnly<T>): void;
    toHaveOddNumber(memberName: PropOnly<T>): void;
    toHaveString(memberName: PropOnly<T>): void;
    toHaveStringLongerThan(memberName: KeyOf<T>, string): void;
    toHaveStringSameLengthAs(memberName: KeyOf<T>, string): void;
    toHaveStringShorterThan(memberName: KeyOf<T>, string): void;
    toHaveTrue(memberName: KeyOf<T>): void;
    toHaveUndefined(memberName: KeyOf<T>): void;
    toHaveWhitespaceString(memberName: KeyOf<T>): void;
    toHaveWholeNumber(memberName: KeyOf<T>): void;
    toBeRegExp(): void;
    toBeEmptyString(): void;
    toBeHtmlString(): void;
    toBeIso8601(): void;
    toBeJsonString(): void;
    toBeLongerThan(otherString: string): void;
    toBeNonEmptyString(): void;
    toBeSameLengthAs(otherString: string): void;
    toBeShorterThan(otherString: string): void;
    toLength(length: number): void;
    /**
     * Checks if *value* is of type `string`.
     *
     * This function does not assert if a string is **empty**. To do
     * so, use `toBeEmptyString` or `not.toBeEmptyString`.
     *
     * Can also be replaced by:
     *
     * ```javascript
     * expect("foo").toBe(expect.any(String))
     * ```
     *
     * @example
     *
     * expect("foo").toBeString()
     *
     * @since 5.0
     */
    toBeString(): void;
    /**
     * Checks if *value* is of type `number`.
     * Can also be replaced by:
     *
     * ```javascript
     * expect(123).toBe(expect.any(Number))
     * ```
     *
     * @example
     *
     * expect(123).toBeNumber()
     *
     * @since 5.0
     */
    toBeNumber(): void;
    /**
     * Checks if *value* is of type `bigint`.
     * Can also be replaced by:
     *
     * ```javascript
     * expect(9007199254740991n).toBe(expect.any(BigInt))
     * ```
     *
     * @example
     *
     * expect(9007199254740991n).toBeBigInt()
     *
     * @since 5.0
     */
    toBeBigInt(): void;
    /**
     * Checks if *value* is of type `array`.
     * Can also be replaced by:
     *
     * ```javascript
     * expect([]).toBe(expect.any(Array))
     * ```
     *
     * @example
     *
     * expect([]).toBeArray()
     *
     * @since 5.0
     */
    toBeArray(): void;
    /**
     * Checks if *value* is of type `object`.
     * Can also be replaced by:
     *
     * ```javascript
     * expect({}).toBe(expect.any(Object))
     * ```
     *
     * @example
     *
     * expect({}).toBeObject()
     *
     * @since 5.0
     */
    toBeObject(): void;
    /**
     * Checks if *value* is of type `symbol`.
     * Can also be replaced by:
     *
     * ```javascript
     * expect(Symbol.for("")).toBe(expect.any(Symbol))
     * ```
     *
     * @example
     *
     * expect(Symbol.for("")).toBeSymbol()
     *
     * @since 5.0
     */
    toBeSymbol(): void;
    /**
     * Checks if *value* is of type `boolean`.
     * Can also be replaced by:
     *
     * ```javascript
     * expect(true).toBe(expect.any(Boolean))
     * ```
     *
     * @example
     *
     * expect(true).toBeBoolean()
     * expect(false).toBeBoolean()
     *
     * @since 5.0
     */
    toBeBoolean(): void;
    toBeWhitespace(): void;
    toEndWith(substring: string): void;
    toStartWith(substring: string): void;
  }

  interface IExpect {
    /**
     * Assert a `value` to some matcher.
     *
     * Nomenclature:
     *
     * ```javascript
     * expect(value).toBe(expected)
     * ```
     *
     * @param value Value to be asserted
     *
     * @since 5.0
     */
    <T extends any>(value: T): IMatchers<T>;
    /**
     * Declares an assertion that checks for **any** value.
     *
     * @example
     *
     * expect(1).toBe(expect.any) // Pass
     * expect("").toBe(expect.any) // Pass
     * expect(expect.any).toBeNull() // Fail
     *
     * @since 5.0
     */
    any: any;
    /**
     * Declares an assertion that checks for **any** value (same of `expect.any`)
     * Or that checks for multiples **types**.
     *
     * Pay atention that, is a `value` is of a type String (for example),
     * If `expect.any(Number)` be used as comparator, the test will fail:
     *
     * ```javascript
     * expect("foo").toBe(expect.any(Number)) // Fail
     * ```
     *
     * @example
     *
     * expect(1).toBe(expect.any(Number)) // Pass
     * expect(1).toBe(expect.any(Number, String)) // Checks if '1' is a Number OR a String
     *
     * @param classType Type values acceptable for `value`
     */
    any(...classType: any[]): any;
  }

  interface IHook {
    (fn: () => void | Promise<void>, timeout?: number): void;
  }

  interface IDescribeClousure {
    /**
     * Create a group of tests.
     *
     * @param descriptionDefinition Resolvable description of the group. It is often a string,
     * but can be sync or async functions, numbers, booleans... Functions will be executed to get the
     * primitive value of then.
     *
     * @param testDefinitions Function for Corde to invoke that will define inner suites a test
     *
     * @since 1.0
     */
    <T extends unknown>(
      definitionResolvable: T,
      testDefinitions: (() => void) | (() => Promise),
    ): void;
  }

  interface ITestClousure {
    /**
     * Define a single test. A test should contain one or more expectations that test action of
     * the discord bot.
     * A spec whose expectations all succeed will be passing and a spec with any failures will fail.
     *
     * @param expectationDescription Textual description of what this test is checking
     * @param assertion Function that contains the code of your test. If not provided it will be ignored in the report.
     * @param timeout Custom timeout for an async test
     *
     * @since 1.0
     */
    <T extends unknown>(
      definitionResolvable: T,
      testDefinitions: (() => void) | (() => Promise),
      timeout?: number | undefined,
    ): void;
  }
}
