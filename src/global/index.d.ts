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
declare const beforeAll: corde.IHook;
declare const beforeEach: corde.IHook;
declare const afterEach: corde.IHook;

declare namespace corde {
  export interface IMatchers<T extends any> {
    toBe(expected: T): void;
    toEqual(expected: T): void;
    toBeCloseTo(expected: T, precisionopt: number): void;
    toBeDefined(): void;
    toBeFalse(): void;
    toBeFalsy(): void;
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
    toBeEmptyArray(): void;
    toBeNonEmptyArray(): void;
    toBeAfter(otherDate: Date): void;
    toBeBefore(otherDate: Date): void;
    toBeDate(): void;
    toBeValidDate(): void;
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
    toHaveMethod(memberName): void;
    toHaveNonEmptyArray(memberName): void;
    toHaveNonEmptyObject(memberName): void;
    toHaveNonEmptyString(memberName): void;
    toHaveNumber(memberName): void;
    toHaveNumberWithinRange(memberName, floor, ceiling): void;
    toHaveObject(memberName): void;
    toHaveOddNumber(memberName): void;
    toHaveString(memberName): void;
    toHaveStringLongerThan(memberName: keyof T, string): void;
    toHaveStringSameLengthAs(memberName: keyof T, string): void;
    toHaveStringShorterThan(memberName: keyof T, string): void;
    toHaveTrue(memberName: keyof T): void;
    toHaveUndefined(memberName: keyof T): void;
    toHaveWhitespaceString(memberName: keyof T): void;
    toHaveWholeNumber(memberName: keyof T): void;
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
    toBeString(): void;
    /**
     * Checks if the *expected* value of type `number`.
     */
    toBeNumber(): void;
    /**
     * Checks if the *expected* value of type `bigint`.
     */
    toBeBigInt(): void;
    /**
     * Checks if the *expected* value of type `array`.
     */
    toBeArray(): void;
    /**
     * Checks if the *expected* value of type `object`.
     */
    toBeObject(): void;
    /**
     * Checks if the *expected* value of type `symbol`.
     */
    toBeSymbol(): void;
    /**
     * Checks if the *expected* value of type `boolean`.
     */
    toBeBoolean(): void;
    toBeWhitespace(): void;
    toEndWith(substring: string): void;
    toStartWith(substring: string): void;
  }

  interface IExpect {
    expect<T extends any>(expected: T): IMatchers<T>;
  }

  interface IHook {
    (fn: () => void | Promise<void>, timeout?: number): void;
  }
}
