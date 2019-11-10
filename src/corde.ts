import { logout } from "./bot";
import MissingTestNameError from "./erros/missingTestNameErro";
import { login } from "./init";
import { getConfig } from "./init";
import { logger } from "./logger";
import * as Discord from "discord.js";

/**
 * Setup the function handler.
 * 
 * @param handlerFunction Function who will handle Discord's messages and will
 * redirect to the desired function.
 * 
 * @example
 * 
 * function commandHandler(msg: Discord.Message) {
 * const args = msg.content
 *   .slice(getConfig().botPrefix.length)
 *   .trim()
 *   .split(/ +/g);
 *
 *  const command = args[0].toLowerCase();
 *
 *  if (command === "hello" || command === "h") {
 *    msg.channel.send("hello!!");
 *  } else if (command === "hey") {
 *    msg.channel.send("hey!!");
 *  }
 * }
 *
 */
export function handler(handlerFunction: (msg: Discord.Message) => void) {
  if (!handlerFunction) {
    throw new Error("Missing handler function");
  }

  getConfig().handlerFunction = handlerFunction;
}

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
export async function afterLogin(tests: () => Promise<boolean | void>, silent?: boolean): Promise<boolean | void> {
  if (tests) {

    if (silent) {
      getConfig().silentMode = true;
    }

    try {

      await login();
      console.log("\n");

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
export default async function it(
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

/**
 * Container of 
 */
export class Compare {
  private input: string;
  private testName: string;

  constructor(input: string, testName: string) {
    this.input = input;
    this.testName = testName;
  }

  public async shouldRespond(expect: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const config = getConfig();
      if (expect === undefined) {
        console.log("No testes were declared");
        process.exit(0);
      } else if (config.channel === undefined) {
        throw new Error("Channel not found");
      } else {
        const toSend = config.botPrefix + this.input;
        await config.channel.send(toSend);
        try {
          const answer = await config.channel.awaitMessages(
            responseName => responseName.author.id === config.botTestId,
            {
              max: 1,
              time: config.timeOut ? config.timeOut : 5000,
              errors: ["time"]
            }
          );

          const content = answer.first().content;

          if (content === expect) {
            logger.sucess(this.testName, expect, content);
            resolve(true);
          } else {
            logger.fail(this.testName, expect, content);
            resolve(false);
          }

        } catch (error) {
          console.log("The bot do not send any message in the time informed.");
          reject(error);
        }
      }
    });
  }
}

/**
 * Receives wich command will be tested.
 * 
 * @param commandName Command name.
 * 
 * @description Do not inform the command prefix if
 * it's already informed in **configs**
 * 
 * @returns The **Compare** object, where will handle 
 * the type of response is expected.
 */
export function command(commandName: string): Compare {
  return new Compare(commandName, this.testName);
}
