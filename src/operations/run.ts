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
    if (steps === undefined) {
      this.sendPassedResponse();
    } else if (config.channel === undefined) {
      throw new Error("Channel not found");
    } else {
      await steps.forEach(async (step) => {

        const toSend = config.botPrefix + step.say;
        config.channel.send(toSend);

        try {

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
        } catch (err) {
          throw new Error(err);
        }
      });

      if (testsOk) {
        console.log("All tests finished successfully");
        process.exit(0);
      } else {
        console.log("Tests runned with errors");
        process.exit(1);
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
