declare const expect: corde.IExpect;

declare const command: any;
declare const con: any;

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
 * beforeAll(async () => {
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
declare function fail(message?: string): void;
