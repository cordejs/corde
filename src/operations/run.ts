import { getConfig } from "../init";
import { Response } from "../parameter";

export default class runTest {
  private testName: string;

  constructor(testName: string) {
    this.testName = testName;
  }

  public async run(...steps: Response[]): Promise<void> {
    let testsOk = true;
    const config = getConfig();
    console.log(config);
    if (steps === undefined) {
      this.sendPassedResponse();
    } else if (config.channel === undefined) {
      throw new Error("Channel not found");
    } else {
      await steps.forEach(async (step) => {

        const toSend = config.botPrefix + step.say;
        config.channel.send(toSend);

        const answer = await config.channel.awaitMessages(
          (responseName) => responseName.author.id === config.botTestId,
          {
            max: 1,
            time: config.timeOut ? config.timeOut : 10000,
            errors: ["time"],
          },
        );

        if (answer.first().content === step.wait) {
          this.sendPassedResponse();
        } else {
          this.sendErrorResponse(step.wait.toString(), answer.first().content);
          testsOk = false;
        }
      });

      if (testsOk) {
        const okMessage = "All tests finished successfully";
        console.info(okMessage);
        config.channel.send(okMessage);
      } else {
        const failMessage = "Tests runned with errors";
        console.info(failMessage);
        config.channel.send(failMessage);
      }
    }
  }

  private sendPassedResponse() {
    console.info(`${this.testName} passed successfully`);
  }

  private sendErrorResponse(expected: string, response: string) {
    console.error(
      `${
      this.testName
      } not passed successfully. Expected ${expected} to be ${response} `,
    );
  }
}
