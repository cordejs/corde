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
    toBe(expected: T): void;
    toEqual(expected: T): void;
    toBeCloseTo(expected: T, precisionopt: number): void;
    toBeDefined(): void;
    toBeFalsy(): void;
    toBePrimitive(): void;
    toBeGreaterThan(expected: number | bigint): void;
    toBeGreaterOrEqualThan(expected: number | bigint): void;
    toBeInstanceOf<U>(expected: U): void;
    toBeLessThan(expected: number | bigint): void;
    toBeLessOrEqualThan(expected: number | bigint): void;
    toBeNaN(): void;
    toBeNothing(): void;
    toBeNegativeInfinity(): void;
    toBeNull(): void;
    toBeUndefined(): void;
    toBePositiveInfinity(): void;
    toBeTrue(): void;
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
    toBeEmptyArray(): void;
    toBeNonEmptyArray(): void;
    toBeAfter(otherDate: Date): void;
    toBeBefore(otherDate: Date): void;
    toBeDate(): void;
    toBeValidDate(): void;
    toBeFunction(): void;
    toThrowAnyError(): void;
    toThrowErrorOfType(constructorName: any): void;
    toBeCalculable(): void;
    toBeEvenNumber(): void;
    toBeGreaterThanOrEqualTo(otherNumber: number | bigint): void;
    toBeLessThanOrEqualTo(otherNumber: number | bigint): void;
    toBeNear(otherNumber: number | bigint, epsilon: any): void;
    toBeOddNumber(): void;
    toBeWithinRange(floor: any, ceiling: any): void;
    toBeEmptyObject(): void;
    toBeNonEmptyObject(): void;
    toHaveArray(memberName: any): void;
    toHaveArrayOfBooleans(memberName: any): void;
    toHaveArrayOfNumbers(memberName: any): void;
    toHaveArrayOfObjects(memberName: any): void;
    toHaveArrayOfSize(memberName: any, size: any): void;
    toHaveArrayOfStrings(memberName: any): void;
    toHaveBoolean(memberName: any): void;
    toHaveCalculable(memberName: any): void;
    toHaveDate(memberName: any): void;
    toHaveDateAfter(memberName: any, date: any): void;
    toHaveDateBefore(memberName: any, date: any): void;
    toHaveEmptyArray(memberName: any): void;
    toHaveEmptyObject(memberName: any): void;
    toHaveEmptyString(memberName: any): void;
    toHaveFalse(memberName: any): void;
    toHaveHtmlString(memberName: any): void;
    toHaveJsonString(memberName: any): void;
    toHaveMember(memberName: any): void;
    toHaveMethod(memberName: FunctionOnly<T>): void;
    toHaveNonEmptyArray(memberName: PropOnly<T>): void;
    toHaveNonEmptyObject(memberName: PropOnly<T>): void;
    toHaveNonEmptyString(memberName: PropOnly<T>): void;
    toHaveNumber(memberName: PropOnly<T>): void;
    toHaveNumberWithinRange(memberName: any, floor: any, ceiling: any): void;
    toHaveObject(memberName: PropOnly<T>): void;
    toHaveOddNumber(memberName: PropOnly<T>): void;
    toHaveString(memberName: PropOnly<T>): void;
    toHaveStringLongerThan(memberName: KeyOf<T>, string: any): void;
    toHaveStringSameLengthAs(memberName: KeyOf<T>, string: any): void;
    toHaveStringShorterThan(memberName: KeyOf<T>, string: any): void;
    toHaveTrue(memberName: KeyOf<T>): void;
    toHaveUndefined(memberName: KeyOf<T>): void;
    toHaveWhitespaceString(memberName: KeyOf<T>): void;
    toHaveWholeNumber(memberName: KeyOf<T>): void;
    toBeRegExp(): void;
    toBeEmptyString(): void;
    toBeHtmlString(): void;
    toBeJsonString(): void;
    toBeLongerThan(otherString: string): void;
    toBeNonEmptyString(): void;
    toBeSameLengthAs(otherString: string): void;
    toBeShorterThan(otherString: string): void;
    toLength(length: number): void;
    toBeString(): void;
    toBeNumber(): void;
    toBeBigInt(): void;
    toBeArray(): void;
    toBeObject(): void;
    toBeSymbol(): void;
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
}
