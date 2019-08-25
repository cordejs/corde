
import MissingTestNameError from "./erros/missingTestNameErro";
import { login } from "./init";
import { logout } from "./bot";
import { getConfig } from "./init";
import { printSucess, printFail } from "./console";


/**
 * Initialize a new test to be executed
 * @param name name of the test (required)
 */
export default async function it(name: string, steps: Function): Promise<void> {
  if (name && name.trim() !== "") {
    await login();
    await steps();
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

  public async toBe(expect: string) {
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

      try {

        const answer = await config.channel.awaitMessages(
          (responseName) => responseName.author.id === config.botTestId,
          {
            max: 1,
            time: config.timeOut ? config.timeOut : 10000,
            errors: ["time"],
          },
        );

        const content = answer.first().content;

        if (content === expect) {
          printSucess(this.testName, expect, content);
        } else {
          printFail(this.testName, expect, content);
          testsOk = false;
        }
      } catch (err) {
        throw new Error(err);
      }

      if (testsOk) {

        console.log("All tests finished successfully");
        process.exit(0);
      } else {
        console.log("Tests runned with errors");
        process.exit(1);
      }
    }
  }
}

export function expect(input: string) {
  return new Compare(input, this.testName);
}
