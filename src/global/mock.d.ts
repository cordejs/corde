declare namespace corde {
  /**
   * Given a value, if it's a function, pick it's return type. Otherwise return
   * the own type
   */
  export type ReturnValueOrOwnType<T> = T extends (...args: any[]) => infer U ? U : T;
  /**
   * Given a value, return its **resolved** value if it's a Promise. Otherwise returns
   * the own type.
   */
  export type ResolvedValue<T> = T extends (...args: any[]) => PromiseLike<infer U> ? U : T;
  /**
   * Given a value, return its **rejected** value if it's a Promise. Otherwise returns
   * the own type.
   */
  export type RejectedValue<T> = T extends (...args: any[]) => PromiseLike<any> ? any : T;
  /**
   * Given a value, returns itself if the type is a function. Otherwise return a function that
   * returns the value.
   */
  export type FunctionOrReturnObjType<T> = T extends (...args: any[]) => any ? T : () => T;

  /**
   * Instance of a property or function mocked in a object
   *
   * @since 5.0
   */
  export interface IMockInstance<
    TEntity extends Record<string, unknown>,
    TKeyEntity extends keyof TEntity,
    TProp = TEntity[TKeyEntity],
  > {
    /**
     * Inform the total amount of calls of the mock.
     * This value is not changed by restore call
     *
     * @example
     *
     * const mock = corde.mock(obj, "someFunction")
     *                   .setImplementation(() => 1);
     *
     * obj.someFunction() // callsCount: 1
     * mock.restore()     // callsCount: 1
     * obj.someFunction() // callsCount: 2
     *
     */
    readonly callsCount: number;
    /**
     * Inform the total amount of call of the mock.
     * This value is resets when restore function is called.
     *
     * @example
     *
     * const mock = corde.mock(obj, "someFunction")
     *                   .setImplementation(() => 1);
     *
     * obj.someFunction() // callsCount: 1
     * mock.restore()     // callsCount: 0
     * obj.someFunction() // callsCount: 1
     *
     */
    readonly instanceCallsCount: number;
    /**
     * Mock the implementation of a function just **one** time.
     * The previous function's value is restored after call it.
     *
     * @param fn Empty or some implementation for a function.
     *
     * @example
     *
     * const obj = {
     *    getNumber: () => {
     *      return 1;
     *    }
     * }
     *
     * const mock = corde.mock(obj, "getNumber")
     *              .setImplementationOnce(() => 2);
     *              .setImplementationOnce(() => 3);
     *
     * obj.getNumber() // Returns 2
     * obj.getNumber() // Returns 3
     * obj.getNumber() // Returns 1
     *
     */
    setImplementationOnce(fn?: corde.FunctionOrReturnObjType<TProp>): this;
    /**
     * Mock the implementation of a function until `restore` function be called,
     * or by the amount of calls this functions must have.
     *
     * If no value is passed to `maxCalls` the value of `fn` will be used as default implementation
     * of the mocked function until `restore()` function be called.
     *
     * @param fn Empty or some implementation for a function.
     * @param maxCalls Defines the max amount of calls the mocked return value will be valid for.
     *
     * @example
     *
     * const obj = {
     *    getNumber: () => {
     *      return 1;
     *    }
     * }
     *
     * const mock = corde.mock(obj, "getNumber")
     *              .setImplementation(() => 2);
     *              .setImplementation(() => 3);
     *
     * obj.getNumber() // Returns 2
     * obj.getNumber() // Returns 3
     * obj.getNumber() // Returns 3
     * obj.getNumber() // Returns 3
     * ...
     *
     * @returns Self instance.
     * @since 5.0
     */
    setImplementation(fn?: FunctionOrReturnObjType<TProp>, maxCalls?: number): this;

    /**
     * Mocks the return value of a property or a function.
     *
     * If no value is passed to maxCalls, `newValue` will be used as return value
     * until `restore()` function be called.
     *
     * @param newValue New return value for the given function or property
     * @param maxCalls Defines the max amount of calls the mocked return value will be valid for.
     *
     * @example
     *
     * const obj = {
     *    increment: (value: number) => {
     *      return ++value;
     *    }
     * }
     *
     * const mock = corde.mock(obj, "increment")
     *              .returnValue(1);
     *              .returnValue(10);
     *
     * obj.increment(1) // Returns 1
     * obj.increment(1) // Returns 10
     * obj.increment(4) // Returns 10
     *
     * @returns Self instance.
     * @since 5.0
     */
    setReturnValue(newValue: ReturnValueOrOwnType<TProp>, maxCalls?: number): this;
    /**
     * Same of `mockReturnValue`, but `newValue` is delimited by just one call
     * @param newValue New return value for the given function or property
     *
     * @example
     *
     * const obj = {
     *    increment: (value: number) => {
     *      return ++value;
     *    }
     * }
     *
     * const mock = corde.mock(obj, "increment")
     *              .returnValueOnce(1);
     *              .returnValueOnce(10);
     *
     * obj.increment(1) // Returns 1
     * obj.increment(1) // Returns 10
     * obj.increment(4) // Returns 5
     *
     * @returns Self instance.
     * @since 5.0
     */
    setReturnValueOnce(newValue: ReturnValueOrOwnType<TProp>): this;
    /**
     * Similar to **mockReturnValue**, but surround the return value with a Promise.resolve
     *
     * @param newValue New resolved value for a function.
     * @param maxCalls Defines the max amount of calls the resolved mocked return value will be valid for.
     *
     * @example
     *
     * // this:
     * corde.mock(obj, "incrementAsync").returnValue(() => Promise.resolve(1));
     * // is equal to:
     * corde.mock(obj, "incrementAsync").resolvedValue(() => 1);
     *
     * @returns Self instance.
     * @since 5.0
     */
    setResolvedValue(newValue: ResolvedValue<TProp>, maxCalls?: number): this;
    /**
     * Same of `mockResolvedValue`, but `newValue` is delimited by just one call.
     *
     * @param newValue New resolved value for a function.
     *
     * @example
     *
     * // this:
     * corde.mock(obj, "incrementAsync").setReturnValueOnce(() => Promise.resolve(1));
     * // is equal to:
     * corde.mock(obj, "incrementAsync").setResolvedValueOnce(() => 1);
     *
     * @returns Self instance.
     * @since 5.0
     */
    setResolvedValueOnce(newValue: ResolvedValue<TProp>): this;

    /**
     * Defines a new value for a function rejection.
     * This function surround `newValue` with a `Promise.reject`
     *
     * @param newValue New rejected value for a function.
     * @param maxCalls Defines the max amount of calls the rejected mocked return value will be valid for.
     *
     * @example
     *
     * // this:
     * corde.mock(obj, "incrementAsync").setReturnValue(() => Promise.reject(1));
     * // is equal to:
     * corde.mock(obj, "incrementAsync").setRejectedValue(() => 1);
     *
     * @returns Self instance.
     * @since 5.0
     */
    setRejectedValue(newValue: RejectedValue<TProp>, maxCalls?: number): this;

    /**
     * Same of `mockRejectedValue`, but `newValue` is delimited by just one call.
     *
     * @param newValue New rejected value for a function.
     *
     * @example
     *
     * // this:
     * corde.mock(obj, "incrementAsync").setReturnValueOnce(() => Promise.reject(1));
     * // is equal to:
     * corde.mock(obj, "incrementAsync").setRejectedValueOnce(() => 1);
     *
     * @returns Self instance.
     * @since 5.0
     */
    setRejectedValueOnce(newValue: RejectedValue<TProp>): this;

    /**
     * Restores all calls and implementation of a mock
     *
     * *Do not restore callsCount*
     *
     * @example
     *
     * const obj = {
     *    increment: (value: number) => {
     *      return ++value;
     *    }
     * }
     *
     * const mock = corde.mock(obj, "increment").setReturnValue(1);
     *
     * obj.increment(2) // Return 1 - Total calls: 1 - InstanceCalls: 1
     * obj.increment(2) // Return 1 - Total calls: 2 - InstanceCalls: 2
     * mock.restore()
     * obj.increment(2) // Return 3 - Total calls: 3 - InstanceCalls: 1
     *
     * @returns Self instance.
     * @since 5.0
     */
    restore(): this;

    /**
     * Restore all calls of mocks without change the return value or implementation mock.
     *
     * @example
     *
     * const obj = {
     *    increment: (value: number) => {
     *      return ++value;
     *    }
     * }
     *
     * const mock = corde.mock(obj, "increment").setReturnValue(1);
     *
     * obj.increment(2) // Return 1 - Total calls: 1 - InstanceCalls: 1
     * obj.increment(2) // Return 1 - Total calls: 2 - InstanceCalls: 2
     * mock.restoreCalls()
     * obj.increment(2) // Return 1 - Total calls: 3 - InstanceCalls: 1
     *
     * @returns Self instance.
     * @since 5.0
     */
    restoreCalls(): this;
  }
}
