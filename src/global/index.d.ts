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
