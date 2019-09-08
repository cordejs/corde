import { logout } from "./bot";
import { printFail, printSucess } from "./console";
import MissingTestNameError from "./erros/missingTestNameErro";
import { login } from "./init";
import { getConfig } from "./init";
import { result } from "./shell";

/**
 * 
 * @param tests 
 */
export async function cases(tests: () => Promise<void> | void) {
  if (tests) {
    try {
      await login();
      return new Promise(async () => {
        try {
          await tests();
          console.log("TESTS PASSED!!!");
          process.exit(0);
        } catch (error) {
          logout();
          process.exit(1);
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
 * @param name name of the test (required)
 */
export default async function it(
  name: string,
  steps: () => Promise<void>
): Promise<void> {
  if (name && name.trim() !== "") {
    try {
      return steps();
    } catch (error) {
      throw error;
    }
  } else {
    logout();
    throw new MissingTestNameError();
  }
}

export class Compare {
  private input: string;
  private testName: string;

  constructor(input: string, testName: string) {
    this.input = input;
    this.testName = testName;
  }

  public async toBe(expect: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let testsOk = true;
      const config = getConfig();
      if (expect === undefined) {
        console.log("No testes were declared");
        process.exit(0);
      } else if (config.channel === undefined) {
        throw new Error("Channel not found");
      } else {
        const toSend = config.botPrefix + this.input;
        await config.channel.send(toSend);
        result.push("tata");
        try {
          const answer = await config.channel.awaitMessages(
            responseName => responseName.author.id === config.botTestId,
            {
              max: 1,
              time: config.timeOut ? config.timeOut : 10000,
              errors: ["time"]
            }
          );

          const content = answer.first().content;

          if (content === expect) {
            printSucess(this.testName, expect, content);
          } else {
            printFail(this.testName, expect, content);
            testsOk = false;
          }
          resolve();
        } catch {
          console.log("The bot do not send any message in the time informed.");
          reject();
        }

        // if (testsOk) {
        //   console.log("All tests finished successfully");
        //   resolve();
        // } else {
        //   console.log("Tests runned with errors");
        //   reject();
        // }
      }
    });
  }
}

export function expect(input: string) {
  return new Compare(input, this.testName);
}
