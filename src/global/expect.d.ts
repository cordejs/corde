declare const expect: corde.IExpect;

declare namespace corde {
  export interface IExpectMatchersWithNot<T> extends corde.IExpectMatchers<T> {
    not: corde.IExpectMatchers<T>;
  }

  export interface IExpect {
    <T>(value: T): corde.IExpectMatchersWithNot<T>;
    any(...classType: any[]): any;
  }

  export interface IExpectMatchers<T> {
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
    /**
     * Checks if a string has another string inclued on it.
     *
     * @example
     *
     * expect("foo bar").toStringContains("bar"); // Pass
     * expect("foo bar").toStringContains("foo"); // Pass
     * expect("foo bar").toStringContains("fii"); // Fail
     *
     * @param incluedValue Value to be inside `expected` string.
     * @since 5.0
     */
    toStringContains(incluedValue: T): void;
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
    /**
     * Checks if a string in constituted of white spaces
     *
     * @example
     *
     * expect("    ").toBeWhitespace(); // Pass
     * expect("aaa").toBeWhitespace(); // Fail
     *
     * @since 5.0
     */
    toBeWhitespace(): void;
    /**
     * Checks if a string that ends with a defined value.
     *
     * @example
     *
     * expect("foo").toStartWith("o"); // Pass
     * expect("foo").toStartWith("fo"); // Fail
     *
     * @param substring Value to be in the end of te string.
     * @since 5.0
     */
    toEndWith(substring: string): void;
    /**
     * Checks if a string that starts with a defined value.
     *
     * @example
     *
     * expect("foo").toStartWith("fo"); // Pass
     * expect("foo").toStartWith("o"); // Fail
     *
     * @param substring Value to be in the beggining of te string.
     * @since 5.0
     */
    toStartWith(substring: string): void;
    /**
     * @since 5.0
     */
    toBeArrayOfBooleans(): void;
    /**
     * @since 5.0
     */
    toBeArrayOfNumbers(): void;
    /**
     * @since 5.0
     */
    toBeArrayOfObjects(): void;
    /**
     * @since 5.0
     */
    toBeArrayOfStrings(): void;
    /**
     * @since 5.0
     */
    toThrowError(): void;
    /**
     * @since 5.0
     */
    toThrowErrorOfType<TError>(errorType: TError): void;
  }
}
