import { MissingTestNameError } from '../erros';
import { getConfig, login } from '../init';
import { logger } from '../logger';
import { logout } from '../bot';

/**
 * Defines which tests will be executed.
 *
 * @example
 *
 *  afterLogin(async () => {
 *      await it("should return Hello!!", async () => {
 *        await expect("hello").toBe("hello!!");
 *      });
 *     await it("should return Hey!!", async () => {
 *        await expect("hey").toBe("hey!!");
 *     });
 *  });
 *
 * @deprecated Pay attention for the **await** operator in before the call
 * functions **it** and **expect**. Because Discord's messages send and return
 * are async, this operatior must be informed in order to allow the correctly
 * execution of tests.
 *
 * @param tests a block of **it** tests
 */
export async function afterLogin(
  tests: () => Promise<boolean | void>,
  silent?: boolean,
): Promise<boolean | void> {
  if (tests) {
    if (silent) {
      getConfig().silentMode = true;
    }

    try {
      await login();
      console.log('\n');

      return new Promise(async (resolve, reject) => {
        try {
          const response = await tests();
          resolve(response);
        } catch (error) {
          logger.error(error);
          reject(error);
        } finally {
          logout();
        }
      });
    } catch (error) {
      throw error;
    }
  } else {
    logout();
    throw new MissingTestNameError();
  }
}
