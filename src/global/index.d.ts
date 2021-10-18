/* eslint-disable @typescript-eslint/triple-slash-reference */

// Project: https://www.cordejs.org
// GitHub:  https://github.com/cordejs/corde
// Definitions by: Lucas Magalhaes <https://github.com/lucasgmagalhaes>
// TypeScript Version: 4.4

/// <reference path="./closures.d.ts" />
/// <reference path="./command.d.ts" />
/// <reference path="./expect.d.ts" />
/// <reference path="./hooks.d.ts" />
/// <reference path="./types.d.ts" />

/**
 * Definition of Corde's types and utility functions
 */
declare namespace corde {
  /**
   * Marks a suite as failed.
   * If the suite has more tests after this function call,
   * These tests will not be executed.
   *
   * @example
   *
   * test("test to fail", async () => {
   *  fail();
   *  expect(1).not.toEqual(1);
   *  await command("ping").toReturn("pong");
   * });
   *
   * @description
   *
   * When the suite above be executed, it will be marked as failed,
   * and corde will pass through
   *
   * ``` javascript
   * expect(1).not.toEqual(1);
   * await command("ping").toReturn("pong");
   * ```
   *
   * Without through a error for the failed assertion and send the command
   * "ping" to Discord.
   *
   * **Others functions will be executed normally, so be carefull about that.**
   *
   * ```javascript
   *
   * test("will throw error", () => {
   *  fail();
   *  throw new Error(); // This error will be thrown
   * });
   *
   * ```
   *
   * @param message Custom error message.
   * @since 5.0
   */
  export function fail(message?: string): void;
  /**
   * Creates a synchronously delay
   *
   * @example
   *
   * it("testing", () => {
   *   // Do something
   *   corde.wait(1000); // Wait 1 second
   *   // .... Do other stuffs
   * });
   *
   * @param miliseconds Time in miliseconds of the delay
   * @since 5.0
   */
  export function wait(miliseconds: number): void;
  /**
   * Creates a asynchronously delay
   *
   * @example
   *
   * it("testing", async () => {
   *   // Do something
   *   await corde.wait(1000); // Wait 1 second
   *   // .... Do other stuffs
   * });
   *
   * @param miliseconds Time in miliseconds of the delay
   * @since 5.0
   */
  export function waitAsync(miliseconds: number): Promise<void>;

  export function send(): corde.ICommandEvent;
}
