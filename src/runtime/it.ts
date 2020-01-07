import { logger } from "src/logger";

import { logout } from "src/bot";

import { MissingTestNameError } from "src/erros/missingTestNameErro";

/**
 * Initialize a new test to be executed
 * 
 * @param name name of the test (required)
 * @throws MissingTestNameError When the name isn't informed.
 * 
 * @example
 *  // Correct use
 *  await it("should return Hey!!", async () => {
 *      await expect("hey").toBe("hey!!");
 *  });
 *
 *  // Incorect use
 *  await it("should return Hey!! and Hello!!", async () => {
 *      await expect("hey").toBe("hey!!");
 *      await expect("hello").toBe("hello!!");
 *  });
 * 
 * @description this function is the container of a lack of tests
 * for a **single command test case**.In other words, this should be used
 * for test only one return of a command. Do not test more than i command
 * in the same it clausure.
 */
export async function it(
    name: string,
    steps: () => Promise<boolean | void>
): Promise<boolean | void> {
    if (name && name.trim() !== "") {
        try {
            logger.info(name);
            return await steps();
        } catch (error) {
            throw error;
        }
    } else {
        logout();
        throw new MissingTestNameError();
    }
}
