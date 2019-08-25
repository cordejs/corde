import { getConfig } from "../init";
import { Response } from "../parameter";
import { printSucess, printFail } from "../console";

export default class runTest {
  private testName: string;

  constructor(testName: string) {
    this.testName = testName;
  }

  public async run(step: Response): Promise<void> {
    let testsOk = true;
    const config = getConfig();
    if (step === undefined) {
      console.log("No testes were declared");
      process.exit(0);
    } else if (config.channel === undefined) {
      throw new Error("Channel not found");
    } else {

      const toSend = config.botPrefix + step.say;
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

        if (content === step.wait) {
          printSucess(this.testName, step.wait, content);
        } else {
          printFail(this.testName, step.wait, content);
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
